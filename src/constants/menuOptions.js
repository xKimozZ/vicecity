import SampleMenuComponent from "../components/MenuComponents/SampleMenuComponent";
import { menuStrings } from "./menuStrings";

export const menuOptions = [
    { buttonNumber: 1, buttonText: menuStrings.menu.map, component: SampleMenuComponent },
    { buttonNumber: 2, buttonText: menuStrings.menu.brief, component: SampleMenuComponent },
    { buttonNumber: 3, buttonText: menuStrings.menu.load, component: SampleMenuComponent },
    { buttonNumber: 4, buttonText: menuStrings.menu.stats, component: SampleMenuComponent },
    { buttonNumber: 5, buttonText: menuStrings.menu.controls, component: SampleMenuComponent },
    { buttonNumber: 6, buttonText: menuStrings.menu.audio, component: SampleMenuComponent },
    { buttonNumber: 7, buttonText: menuStrings.menu.display, component: SampleMenuComponent },
    { buttonNumber: 8, buttonText: menuStrings.menu.language, component: SampleMenuComponent },
    // Add more options as needed
  ];