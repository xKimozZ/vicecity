import useSoundManager from "./useSoundManager";

const useEventHandler = () => {
    const { playHover, playSelect, playBack, playError, playInfo } = useSoundManager();

    const handleInfo = () => {
        playInfo();
      };
    
      const handleHover = () => {
        playHover();
      };
    
      const handleSelect = () => {
        playSelect();
      };
    
      const handleBack = () => {
        playBack();
      };
    
      const handleError = () => {
        playError();
      };

  return {
    handleBack, handleSelect, handleError, handleHover, handleInfo
  };
};

export default useEventHandler;