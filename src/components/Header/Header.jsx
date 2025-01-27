import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import { stringMenuSelector } from "../../store/localizationSlice";
import { navigationSelector } from "../../store/navigationSlice";
import getMenuName from "../../utils/getMenuName";


const Header = () => {
  const strings = useSelector(stringMenuSelector);
  const { nextButtonGroup } = useSelector(navigationSelector);
  const currentMenuName = getMenuName( nextButtonGroup, strings);

  return <span className={styles.Header}>{currentMenuName}</span>;
};

export default Header;
