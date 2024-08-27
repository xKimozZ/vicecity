import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import { stringSelector } from "../../store/localizationSlice";
import { navigationSelector } from "../../store/navigationSlice";
import getMenuName from "../../utils/getMenuName";


const Header = () => {
  const { menu } = useSelector(stringSelector);
  const { nextButtonGroup } = useSelector(navigationSelector);
  const currentMenuName = getMenuName( nextButtonGroup, menu);

  return <span className={styles.Header}>{currentMenuName}</span>;
};

export default Header;
