import { useSelector } from "react-redux";
import useSoundManager from "./useSoundManager";
import { navigationSelector } from "../store/navigationSlice";
import useDispatchAbstractor from "./useDispatchAbstractor";
import { useEffect, useState, useRef } from "react";
import { miscSelector } from "../store/miscSlice";

const useDebounce = () => {
  const { miscFunctions } = useDispatchAbstractor();
  const { playHover, playSelect, playBack, playError, playInfo } =
    useSoundManager();
  const { keyPressed } = useSelector(navigationSelector);
  const { barLastUpdate } = useSelector(miscSelector);
  const [barSinglePressTime, setBarSinglePressTime] = useState(0);
  const timeoutRef = useRef(null);

  const playSoundAfterDelay = (date) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (barLastUpdate === 0) {
        setTimeout(() => {
          setBarSinglePressTime(date);
        }, 60);
        return;
      }
      if (Date.now() - barLastUpdate > 50) {
        playSelect();
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
      playSelect();
      miscFunctions.setBarLastUpdate(0);
    }
  }, [barSinglePressTime]);

  return {playSoundAfterDelay};
};

export default useDebounce;