import { useSelector } from "react-redux";
import { buttonGroups } from "../../../constants/buttonGroups";
import { stringSelector } from "../../../store/localizationSlice";
import Button from "../../Button/Button";
import styles from "./LanguageMenu.module.css";
import { languageMap } from "../../../constants/menuStrings";

const LanguageMenu = () => {
  const strings = useSelector(stringSelector);

  return (
    <div className={styles.languageContainer}>
      <Button
        buttonNumber={1}
        buttonGroup={buttonGroups.LANGUAGE}
        textColor="var(--pink)"
        buttonText={strings.language.english}
        actions={{nextLanguage: languageMap.en}}
      />
      <Button
        buttonNumber={2}
        buttonGroup={buttonGroups.LANGUAGE}
        textColor="var(--pink)"
        buttonText={strings.language.french}
        actions={{nextLanguage: languageMap.fr}}
      />
      <Button
        buttonNumber={3}
        buttonGroup={buttonGroups.LANGUAGE}
        textColor="var(--pink)"
        buttonText={strings.language.german}
        actions={{nextLanguage: languageMap.de}}
      />
      <Button
        buttonNumber={4}
        buttonGroup={buttonGroups.LANGUAGE}
        textColor="var(--pink)"
        buttonText={strings.language.italian}
        actions={{nextLanguage: languageMap.it}}
      />
      <Button
        buttonNumber={5}
        buttonGroup={buttonGroups.LANGUAGE}
        textColor="var(--pink)"
        buttonText={strings.language.spanish}
        actions={{nextLanguage: languageMap.es}}
      />
    </div>
  );
};

export default LanguageMenu;
