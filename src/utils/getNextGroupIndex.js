import { buttonGroupMap } from "../constants/buttonGroups";

const getNextGroupIndex = (nextButtonGroup) => {
    return buttonGroupMap[nextButtonGroup] ?? 0;
}

export default getNextGroupIndex;