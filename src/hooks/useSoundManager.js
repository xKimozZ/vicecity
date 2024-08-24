import useSound from 'use-sound';
import { soundImports } from '../assets/soundImports';

const {menuSounds} = soundImports;
const defaultVolume = 0.5;

const useSoundManager = () => {
  const [playHover] = useSound(menuSounds.hover, {volume: defaultVolume});
  const [playSelect] = useSound(menuSounds.select, {volume: defaultVolume});
  const [playBack] = useSound(menuSounds.back, {volume: defaultVolume});
  const [playError] = useSound(menuSounds.error, {volume: defaultVolume});
  const [playInfo] = useSound(menuSounds.info, {volume: defaultVolume});

  return {
    playHover,
    playSelect,
    playBack,
    playError,
    playInfo,
  };
};

export default useSoundManager;
