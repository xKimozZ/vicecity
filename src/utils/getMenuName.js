import { buttonGroups } from "../constants/buttonGroups";

const getMenuName = (nextButtonGroup, strings) => {
  switch (nextButtonGroup) {
    case buttonGroups.MAP:
      return strings.map;
    case buttonGroups.BRIEF:
      return strings.brief;
    case buttonGroups.LOAD:
      return strings.load;
    case buttonGroups.STATS:
      return strings.stats;
    case buttonGroups.CONTROLS:
      return strings.controls;
    case buttonGroups.AUDIO:
      return strings.audio;
    case buttonGroups.DISPLAY:
      return strings.display;
    case buttonGroups.LANGUAGE:
      return strings.language;
    default:
      return "NULL";
  }
};

export default getMenuName;
