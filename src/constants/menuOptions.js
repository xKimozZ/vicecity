import LanguageMenu from "../components/MenuComponents/LanguageMenu/LanguageMenu";
import SampleMenuComponent from "../components/MenuComponents/SampleMenuComponent";
import { menuStrings } from "./menuStrings";
import { buttonGroups } from "./buttonGroups";

export const menuOptions = [
  {
    buttonNumber: 1,
    buttonText: menuStrings.menu.map,
    component: SampleMenuComponent,
    frameClip: `polygon(13.75% 4.88%, 89.06% 10.16%, 93.75% 79.88%, 9.53% 83%)`,
    buttonGroup: buttonGroups.MAIN_MENU,
    triggersGroup: buttonGroups.LANGUAGE,
  },
  {
    buttonNumber: 2,
    buttonText: menuStrings.menu.brief,
    component: SampleMenuComponent,
    frameClip: `polygon(11.86% 14.38%, 89.06% 14.51%, 95.47% 74.61%, 15.63% 75.98%)`,
    buttonGroup: buttonGroups.MAIN_MENU,
    triggersGroup: buttonGroups.LANGUAGE,
  },
  {
    buttonNumber: 3,
    buttonText: menuStrings.menu.load,
    component: SampleMenuComponent,
    frameClip: `polygon(10.41% 15.43%, 88.25% 4.72%, 93.75% 76.37%, 8.49% 78.83%)`,
    buttonGroup: buttonGroups.MAIN_MENU,
    triggersGroup: buttonGroups.LANGUAGE,
  },
  {
    buttonNumber: 4,
    buttonText: menuStrings.menu.stats,
    component: SampleMenuComponent,
    frameClip: `polygon(10.94% 16.52%, 85.94% 3.75%, 90.94% 76.17%, 11.66% 78.71%)`,
    buttonGroup: buttonGroups.MAIN_MENU,
    triggersGroup: buttonGroups.LANGUAGE,
  },
  {
    buttonNumber: 5,
    buttonText: menuStrings.menu.controls,
    component: SampleMenuComponent,
    frameClip: `polygon(11.48% 9.38%, 92.1% 14.26%, 96.43% 74.61%, 6.88% 83.48%)`,
    buttonGroup: buttonGroups.MAIN_MENU,
    triggersGroup: buttonGroups.LANGUAGE,
  },
  {
    buttonNumber: 6,
    buttonText: menuStrings.menu.audio,
    component: SampleMenuComponent,
    frameClip: `polygon(16.32% 10.55%, 88.1% 5.63%, 95.44% 74.41%, 8.38% 82.84%)`,
    buttonGroup: buttonGroups.MAIN_MENU,
    triggersGroup: buttonGroups.LANGUAGE,
  },
  {
    buttonNumber: 7,
    buttonText: menuStrings.menu.display,
    component: SampleMenuComponent,
    frameClip: `polygon(15.31% 14.36%, 83.75% 4.2%, 94.38% 83.67%, 15.75% 77.38%)`,
    buttonGroup: buttonGroups.MAIN_MENU,
    triggersGroup: buttonGroups.LANGUAGE,
  },
  {
    buttonNumber: 8,
    buttonText: menuStrings.menu.language,
    component: LanguageMenu,
    frameClip: `polygon(15.63% 11.26%, 86.25% 4.42%, 95.16% 75.85%, 15.78% 82.57%)`,
    buttonGroup: buttonGroups.MAIN_MENU,
    triggersGroup: buttonGroups.LANGUAGE,
  },
  /*
  {
    buttonNumber: 9,
    buttonText: menuStrings.menu.credits,
    component: SampleMenuComponent,
    frameClip: `polygon(8% 5%, 92% 11%, 95% 75%, 6.5% 83%)`
  },*/
];
