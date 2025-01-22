import { useEffect } from 'react';
import useDispatchAbstractor from './useDispatchAbstractor';

const useKeyPress = () => {
  const { navigationFunctions } = useDispatchAbstractor();

  useEffect(() => {
    const handleKeyUp = () => navigationFunctions.setKeyPressed(false);

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

};

export default useKeyPress;
