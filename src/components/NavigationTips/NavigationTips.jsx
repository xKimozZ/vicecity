import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import styles from "./NavigationTips.module.css";
import { languageMap } from "../../constants/menuStrings";
import { buttonGroups } from "../../constants/buttonGroups";

const { MAP, STATS } = buttonGroups;

const NavigationTips = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { navigationState, localizationState } = selectorAbstractor;
  const { activeButtonGroup } = navigationState;
  const { languageState: language, stringNavState: strings } = localizationState;

  const rightArrow = <span>&#9654;</span>;
  const leftArrow = <span>&#9664;</span>;
  const upArrow = <span>&#9650;</span>;
  const downArrow = <span>&#9660;</span>;
  const allArrows = [upArrow, downArrow, rightArrow, leftArrow];

  const boldButtonIcon = (button) => {
    return <span style={{ fontWeight: "" }}>{button}</span>;
  };

  const buildButtonText = (button, text, lang) => {
    switch (lang) {
      case languageMap.en:
        return (
          <span>
            {boldButtonIcon(button)} {text}
          </span>
        );
      case languageMap.es:
        return (
          <span>
            {text} {boldButtonIcon(button)}
          </span>
        );
      case languageMap.fr:
        return (
          <span>
            {text} {boldButtonIcon(button)}
          </span>
        );
      case languageMap.de:
        return (
          <span>
            {boldButtonIcon(button)}
            {text}
          </span>
        );
      case languageMap.it:
        return (
          <span>
            {text} {boldButtonIcon(button)}
          </span>
        );
      default:
        return (
          <span>
            {button} {text}
          </span>
        );
    }
  };
  
  const XButtonText = buildButtonText(<span>&#10006;</span>, strings.button, language);
  const TriangleButtonText = buildButtonText(<span>&#9651;</span>, strings.button, language);
  const StartButtonText = buildButtonText("START", strings.button, language);
  const RButtonText = buildButtonText("R1 \\ R2", strings.button, language);

  const line = (left, right) => {
    return (
      <tr style={{lineHeight: activeButtonGroup === MAP && "1.05"}}>
        <td>{left}</td>
        <td>&nbsp;-&nbsp;</td>
        <td>{right} </td>
      </tr>
    );
  };

  const getInstructions = () => {
    switch (activeButtonGroup) {
      case MAP:
        return [
            line(XButtonText, strings.select),
            line(TriangleButtonText, strings.back),
            line(StartButtonText, strings.resume),
            line(allArrows, strings.scroll),
            line(RButtonText, strings.zoom),
          ];
      case STATS:
        return [
            line(XButtonText, strings.back),
            line(TriangleButtonText, strings.back),
            line(StartButtonText, strings.resume),
            line([upArrow, downArrow], strings.scroll),
          ];
      default:
        return [
          line(XButtonText, strings.select),
          line(TriangleButtonText, strings.back),
          line(StartButtonText, strings.resume),
          line(allArrows, strings.navigate),
        ];
    }
  };

  return (
    <div className={`${styles.tipsContainer} arborcrest arborcrestS`}>
      <div className={styles.tipsContent}>
        <table>
          <tbody>{getInstructions()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default NavigationTips;
