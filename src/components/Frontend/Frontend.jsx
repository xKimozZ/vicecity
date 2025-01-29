import Landscape from "./Landscape";
import { elementIds } from "../../constants/elementIds";
const { FRONTEND_ROOT_ID } = elementIds.FRONTEND;

const Frontend = () => {

  return (
    <div id={FRONTEND_ROOT_ID}>
      <Landscape />
    </div>
  );
}

export default Frontend;
