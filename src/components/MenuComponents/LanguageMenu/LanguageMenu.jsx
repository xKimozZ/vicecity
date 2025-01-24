import { useSelector } from "react-redux";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { stringLanguageSelector } from "../../../store/localizationSlice";
import Button from "../../Button/Button";
import styles from "./LanguageMenu.module.css";
import { languageMap } from "../../../constants/menuStrings";

const { ENGLISH, FRENCH, GERMAN, ITALIAN, SPANISH } = buttonIndices.LANGUAGE;

const LanguageMenu = () => {
  const strings = useSelector(stringLanguageSelector);

  return (
    <div className={styles.languageContainer}>
      <Button
        buttonNumber={ENGLISH}
        buttonGroup={buttonGroups.LANGUAGE}
        textColor="var(--pink)"
        buttonText={strings.english}
        actions={{nextLanguage: languageMap.en}}
      />
      <Button
        buttonNumber={FRENCH}
        buttonGroup={buttonGroups.LANGUAGE}
        textColor="var(--pink)"
        buttonText={strings.french}
        actions={{nextLanguage: languageMap.fr}}
      />
      <Button
        buttonNumber={GERMAN}
        buttonGroup={buttonGroups.LANGUAGE}
        textColor="var(--pink)"
        buttonText={strings.german}
        actions={{nextLanguage: languageMap.de}}
      />
      <Button
        buttonNumber={ITALIAN}
        buttonGroup={buttonGroups.LANGUAGE}
        textColor="var(--pink)"
        buttonText={strings.italian}
        actions={{nextLanguage: languageMap.it}}
      />
      <Button
        buttonNumber={SPANISH}
        buttonGroup={buttonGroups.LANGUAGE}
        textColor="var(--pink)"
        buttonText={strings.spanish}
        actions={{nextLanguage: languageMap.es}}
      />
    </div>
  );
};

export default LanguageMenu;
