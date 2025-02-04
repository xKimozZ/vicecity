import Landscape from "./Landscape";
import { elementIds } from "../../constants/elementIds";
import MobileWarning from "./MobileWarning";
const { FRONTEND_ROOT_ID } = elementIds.FRONTEND;

const Frontend = () => {

  return (
    <div id={FRONTEND_ROOT_ID}>
      <Landscape />
      <MobileWarning />
    </div>
  );
}

export default Frontend;
