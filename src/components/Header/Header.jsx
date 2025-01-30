import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import styles from "./Header.module.css";
import getMenuName from "../../utils/getMenuName";

const Header = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { nextButtonGroup } = selectorAbstractor.navigationState;
  const strings = selectorAbstractor.localizationState.stringMenuState;

  const currentMenuName = getMenuName( nextButtonGroup, strings);

  return <span className={`${styles.Header} pricedownL`}>{currentMenuName}</span>;
};

export default Header;
