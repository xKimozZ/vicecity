import { buttonGroups } from "./buttonGroups";
import LanguageMenu from "../components/MenuComponents/LanguageMenu/LanguageMenu";
import SampleMenuComponent from "../components/MenuComponents/SampleMenuComponent";
import StatsMenu from "../components/MenuComponents/StatsMenu/StatsMenu";
import BriefMenu from "../components/MenuComponents/BriefMenu/BriefMenu";
import LoadMenu from "../components/MenuComponents/LoadMenu/LoadMenu";
import DisplayMenu from "../components/MenuComponents/DisplayMenu/DisplayMenu";
import ControlsMenu from "../components/MenuComponents/ControlsMenu/ControlsMenu";

const menuOptions = [
    {
      //buttonNumber: getGroupIndex(buttonGroups.MAP),
      buttonText: "map",
      component: SampleMenuComponent,
      frameClip: `polygon(13.75% 3.88%, 87.06% 8.16%, 91.75% 81.88%, 9.53% 85%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.MAP,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.BRIEF),
      buttonText: "brief",
      component: BriefMenu,
      frameClip: `polygon(11.86% 12.38%, 86.06% 12.51%, 92.47% 76.61%, 15.63% 77.98%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.BRIEF,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.LOAD),
      buttonText: "load",
      component: LoadMenu,
      frameClip: `polygon(10.41% 13.43%, 89.25% 4.72%, 92.75% 80.37%, 8.49% 82.83%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.LOAD,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.STATS),
      buttonText: "stats",
      component: StatsMenu,
      frameClip: `polygon(10.94% 12.52%, 86.94% 3.75%, 90.94% 80.17%, 11.66% 82.71%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.STATS,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.CONTROLS),
      buttonText: "controls",
      component: ControlsMenu,
      frameClip: `polygon(10.48% 8.38%, 89.1% 12.26%, 93.43% 77.61%, 6.88% 86.48%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.CONTROLS,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.AUDIO),
      buttonText: "audio",
      component: SampleMenuComponent,
      frameClip: `polygon(16.32% 8.55%, 87.1% 4.63%, 92.44% 75.41%, 8.38% 84.84%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.AUDIO,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.DISPLAY),
      buttonText: "display",
      component: DisplayMenu,
      frameClip: `polygon(15.31% 10.36%, 83.75% 3.7%, 91.38% 84.67%, 15.75% 81.38%)`,
      buttonGroup: buttonGroups.MAIN,
      actions: {
        nextMenu: buttonGroups.DISPLAY,
      },
    },
    {
      //buttonNumber: getGroupIndex(buttonGroups.LANGUAGE),
      buttonText: "language",
      component: LanguageMenu,
      frameClip: `polygon(15.63% 9.26%, 84.25% 4.42%, 92.16% 77.85%, 15.78% 84.57%)`,
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