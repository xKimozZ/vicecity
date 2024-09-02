import { useState, useEffect } from 'react';

const useKeyPress = () => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = () => setKeyPressed(true);
    const handleKeyUp = () => setKeyPressed(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return { keyPressed, setKeyPressed };
};

export default useKeyPress;
