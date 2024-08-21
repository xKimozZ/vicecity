import styles from "./Cursor.module.css";
import { cursorSelector } from "../../store/cursorSlice";
import { useSelector } from "react-redux";


const Cursor = () => {
  const { positionStyle, clipPathStyle } = useSelector(cursorSelector);

  return <div className={styles.cursorBackground} style={{...positionStyle, ...clipPathStyle}} />;
};

export default Cursor;
