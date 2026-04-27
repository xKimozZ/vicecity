import useSound from 'use-sound';
import { soundImports } from '../assets/soundImports';
import { useReduxAbstractorContext } from '../context/ReduxAbstractorContext';

const {menuSounds} = soundImports;
const BASE_VOLUME = 0.7;

const useSoundManager = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { audioSettings } = selectorAbstractor.miscState;
  const SLOPE = BASE_VOLUME / (13/16); // ugly but 0.7 is the sweet spot, so i want it to be the default vol

  const sfxVolume = audioSettings.sfx * SLOPE;
  const [playHover] = useSound(menuSounds.hover, {volume: sfxVolume});
  const [playSelect] = useSound(menuSounds.select, {volume: sfxVolume});
  const [playBack] = useSound(menuSounds.back, {volume: sfxVolume});
  const [playError] = useSound(menuSounds.error, {volume: sfxVolume});
  const [playInfo] = useSound(menuSounds.info, {volume: sfxVolume});

  return {
    playHover,
    playSelect,
    playBack,
    playError,
    playInfo,
  };
};

export default useSoundManager;
