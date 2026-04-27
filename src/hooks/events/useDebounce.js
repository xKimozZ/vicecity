import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import { useEffect, useState, useRef } from "react";

const useDebounce = (playSound) => {
  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { miscFunctions } = dispatchAbstractor;
  const { keyPressed } = selectorAbstractor.navigationState;
  const { barLastUpdate } = selectorAbstractor.miscState;

  const [barSinglePressTime, setBarSinglePressTime] = useState(0);
  const timeoutRef = useRef(null);

  const playSoundAfterDelay = () => {
    const date = Date.now();
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (barLastUpdate === 0) {
        setTimeout(() => {
          setBarSinglePressTime(date);
        }, 60);
        return;
      }
      if (Date.now() - barLastUpdate > 50) {
        playSound();
      }
      miscFunctions.setBarLastUpdate(0);
    }, 50);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (
      !keyPressed &&
      barLastUpdate === barSinglePressTime &&
      barSinglePressTime !== 0
    ) {
      playSound();
      miscFunctions.setBarLastUpdate(0);
    }
  }, [barSinglePressTime]);

  return {playSoundAfterDelay};
};

export default useDebounce;