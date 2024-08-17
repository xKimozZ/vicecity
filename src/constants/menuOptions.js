import SampleMenuComponent from "../components/MenuComponents/SampleMenuComponent";
import { menuStrings } from "./menuStrings";

export const menuOptions = [
  {
    buttonNumber: 1,
    buttonText: menuStrings.menu.map,
    component: SampleMenuComponent,
    frameClip: `polygon(8% 5%, 92% 11%, 95% 75%, 6.5% 83%)`
  },
  {
    buttonNumber: 2,
    buttonText: menuStrings.menu.brief,
    component: SampleMenuComponent,
    frameClip: `polygon(8% 16.5%, 90% 16.5%, 95% 72%, 10% 75%)`
  },
  {
    buttonNumber: 3,
    buttonText: menuStrings.menu.load,
    component: SampleMenuComponent,
    frameClip: `polygon(5.6% 17.4%, 90% 5.5%, 92% 75%, 4.5% 80%)`
  },
  {
    buttonNumber: 4,
    buttonText: menuStrings.menu.stats,
    component: SampleMenuComponent,
    frameClip: `polygon(6% 20.2%, 86% 3%, 88% 75%, 6.5% 80%)`
  },
  {
    buttonNumber: 5,
    buttonText: menuStrings.menu.controls,
    component: SampleMenuComponent,
    frameClip: `polygon(8% 16.5%, 90% 16.5%, 95% 75%, 10% 75%)`
  },
  {
    buttonNumber: 6,
    buttonText: menuStrings.menu.audio,
    component: SampleMenuComponent,
    frameClip: `polygon(8% 16.5%, 90% 16.5%, 95% 75%, 10% 75%)`
  },
  {
    buttonNumber: 7,
    buttonText: menuStrings.menu.display,
    component: SampleMenuComponent,
    frameClip: `polygon(8% 16.5%, 90% 16.5%, 95% 75%, 10% 75%)`
  },
  {
    buttonNumber: 8,
    buttonText: menuStrings.menu.language,
    component: SampleMenuComponent,
    frameClip: `polygon(8% 16.5%, 90% 16.5%, 95% 75%, 10% 75%)`
  },
  // Add more options as needed
];
