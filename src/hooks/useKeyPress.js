import { useEffect } from 'react';
import { setKeyPressed } from '../store/navigationSlice';
import { useDispatch } from 'react-redux';

const useKeyPress = () => {
    const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyUp = () => dispatch(setKeyPressed(false));

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

};

export default useKeyPress;
