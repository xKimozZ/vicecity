import { buttonGroups } from "./buttonGroups";
import LanguageMenu from "../components/MenuComponents/LanguageMenu/LanguageMenu";
import SampleMenuComponent from "../components/MenuComponents/SampleMenuComponent";
import StatsMenu from "../components/MenuComponents/StatsMenu/StatsMenu";
import BriefMenu from "../components/MenuComponents/BriefMenu/BriefMenu";
import LoadMenu from "../components/MenuComponents/LoadMenu/LoadMenu";
import DisplayMenu from "../components/MenuComponents/DisplayMenu/DisplayMenu";

const menuOptions = [
    {
      //buttonNumber: getGroupIndex(buttonGroups.MAP),
      buttonText: "map",
      component: SampleMenuComponent,
      frameClip: `polygon(13.75% 4.88%, 89.06% 10.16%, 93.75% 79.88%, 9.53% 83%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.MAP,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.BRIEF),
      buttonText: "brief",
      component: BriefMenu,
      frameClip: `polygon(11.86% 14.38%, 89.06% 14.51%, 95.47% 74.61%, 15.63% 75.98%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.BRIEF,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.LOAD),
      buttonText: "load",
      component: LoadMenu,
      frameClip: `polygon(10.41% 15.43%, 88.25% 4.72%, 93.75% 76.37%, 8.49% 78.83%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.LOAD,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.STATS),
      buttonText: "stats",
      component: StatsMenu,
      frameClip: `polygon(10.94% 16.52%, 85.94% 3.75%, 90.94% 76.17%, 11.66% 78.71%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.STATS,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.CONTROLS),
      buttonText: "controls",
      component: SampleMenuComponent,
      frameClip: `polygon(11.48% 9.38%, 92.1% 14.26%, 96.43% 74.61%, 6.88% 83.48%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.CONTROLS,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.AUDIO),
      buttonText: "audio",
      component: SampleMenuComponent,
      frameClip: `polygon(16.32% 10.55%, 88.1% 5.63%, 95.44% 74.41%, 8.38% 82.84%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.AUDIO,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.DISPLAY),
      buttonText: "display",
      component: DisplayMenu,
      frameClip: `polygon(15.31% 14.36%, 83.75% 4.2%, 94.38% 83.67%, 15.75% 77.38%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.DISPLAY,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.LANGUAGE),
      buttonText: "language",
      component: LanguageMenu,
      frameClip: `polygon(15.63% 11.26%, 86.25% 4.42%, 95.16% 75.85%, 15.78% 82.57%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.LANGUAGE,
      },
    },
    /*
    {
      buttonNumber: 9,
      buttonText: strings.menu.credits,
      component: SampleMenuComponent,
      frameClip: `polygon(8% 5%, 92% 11%, 95% 75%, 6.5% 83%)`
    },*/
  ];

export default menuOptions;