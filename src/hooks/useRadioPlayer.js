import { useRef, useEffect } from 'react';
import { useReduxAbstractorContext } from '../context/ReduxAbstractorContext';
import { actionNames } from '../constants/actionNames';
import { buttonGroups } from '../constants/buttonGroups';
import { soundImports } from '../assets/soundImports';

const { AUDIO } = actionNames;

const BASE_VOLUME = 0.7;
const SLOPE = BASE_VOLUME / (13 / 16);
const PLAY_DELAY = 400; // ms before starting playback

const STATION_COUNT = AUDIO.RADIO_LIST_END - AUDIO.RADIO_LIST_START + 1; // 9

const useRadioPlayer = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { activeButtonGroup } = selectorAbstractor.navigationState;
  const { audioSettings } = selectorAbstractor.miscState;

  const station = audioSettings[AUDIO.RADIO_ID];
  const musicVolume = audioSettings[AUDIO.MUSIC_ID] * SLOPE;
  const isInAudioMenu = activeButtonGroup === buttonGroups.AUDIO;

  // All mutable state lives in refs — no extra renders needed
  const playerRef = useRef(null);
  // Wall-clock time at which each station's audio position 0 occurred (ms)
  const virtualStartsRef = useRef(new Array(STATION_COUNT).fill(null));
  // Known durations per station (seconds), filled when metadata loads
  const durationsRef = useRef(new Array(STATION_COUNT).fill(null));
  const metaLoadersRef = useRef([]);
  const playTimerRef = useRef(null);
  const prevMenuRef = useRef(false);
  const prevStationRef = useRef(station);
  // Always-current volume so the delayed callback reads the latest value
  const musicVolumeRef = useRef(musicVolume);
  musicVolumeRef.current = musicVolume;

  // Mount: create the main player and one metadata-only loader per station
  useEffect(() => {
    const player = new Audio();
    player.loop = true;
    player.preload = 'none';
    playerRef.current = player;

    const { radioSounds } = soundImports;
    const loaders = radioSounds.map((src, i) => {
      const loader = new Audio();
      loader.preload = 'metadata';
      loader.src = src;
      loader.addEventListener('loadedmetadata', () => {
        durationsRef.current[i] = loader.duration;
        // Randomise virtual start so the station feels like it was already playing
        if (virtualStartsRef.current[i] === null) {
          virtualStartsRef.current[i] = Date.now() - Math.random() * loader.duration * 1000;
        }
      });
      return loader;
    });
    metaLoadersRef.current = loaders;

    return () => {
      clearTimeout(playTimerRef.current);
      player.pause();
      player.src = '';
      loaders.forEach(l => { l.src = ''; });
    };
  }, []);

  // Reactively update volume while already playing
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  // Central logic: react to menu entry/exit and station switches
  useEffect(() => {
    const wasInMenu = prevMenuRef.current;
    const prevStation = prevStationRef.current;

    prevMenuRef.current = isInAudioMenu;
    prevStationRef.current = station;

    clearTimeout(playTimerRef.current);

    // Left the audio menu — stop immediately
    if (!isInAudioMenu) {
      if (wasInMenu && playerRef.current) {
        playerRef.current.pause();
      }
      return;
    }

    const justEntered = !wasInMenu;
    const stationChanged = wasInMenu && prevStation !== station;

    // Pause during the delay so there's silence before the new station starts
    if ((justEntered || stationChanged) && playerRef.current) {
      playerRef.current.pause();
    }

    playTimerRef.current = setTimeout(() => {
      const player = playerRef.current;
      if (!player) return;

      const { radioSounds } = soundImports;
      const src = radioSounds[station];

      // Swap source only when necessary
      if (player.getAttribute('data-station') !== String(station)) {
        player.pause();
        player.src = src;
        player.setAttribute('data-station', String(station));
      }

      player.volume = musicVolumeRef.current;

      const dur = durationsRef.current[station];
      if (dur !== null) {
        // Seek to where the station would be right now (lazy — only at play time)
        const vs = virtualStartsRef.current[station];
        player.currentTime = ((Date.now() - vs) / 1000) % dur;
        player.play().catch(() => {});
      } else {
        // Duration unknown — load metadata first, then seek and play
        const seekAndPlay = () => {
          const d = player.duration;
          durationsRef.current[station] = d;
          if (virtualStartsRef.current[station] === null) {
            virtualStartsRef.current[station] = Date.now() - Math.random() * d * 1000;
          }
          const vs = virtualStartsRef.current[station];
          player.currentTime = ((Date.now() - vs) / 1000) % d;
          player.play().catch(() => {});
        };
        player.addEventListener('loadedmetadata', seekAndPlay, { once: true });
        player.load();
      }
    }, PLAY_DELAY);
  }, [isInAudioMenu, station]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useRadioPlayer;
