import useSound from 'use-sound';
import { soundImports } from '../assets/soundImports';

const {menuSounds} = soundImports;

const useSoundManager = () => {
  const [playHoverRight] = useSound(menuSounds.hoverRight);
  const [playHoverLeft] = useSound(menuSounds.hoverLeft);
  const [playSelectRight] = useSound(menuSounds.selectRight);
  const [playSelectLeft] = useSound(menuSounds.selectLeft);
  const [playBackRight] = useSound(menuSounds.backRight, { preload: true });
  const [playBackLeft] = useSound(menuSounds.backLeft, { preload: true });
  const [playErrorRight] = useSound(menuSounds.errorRight, { preload: true });
  const [playErrorLeft] = useSound(menuSounds.errorLeft, { preload: true });
  const [playInfoRight] = useSound(menuSounds.infoRight, { preload: true });
  const [playInfoLeft] = useSound(menuSounds.infoLeft, { preload: true });
  const [playInfoEcho] = useSound(menuSounds.infoEcho, { preload: true });

  const playHover = () => {
    playHoverRight();
    playHoverLeft();
  };

  const playSelect = () => {
    playSelectRight();
    playSelectLeft();
  };

  const playBack = () => {
    playBackRight();
    playBackLeft();
  };

  const playError = () => {
    playErrorRight();
    playErrorLeft();
  };

  const playInfo = () => {
    playInfoRight();
    playInfoLeft();
    playInfoEcho();
  };

  return {
    playHover,
    playSelect,
    playBack,
    playError,
    playInfo,
  };
};

export default useSoundManager;
