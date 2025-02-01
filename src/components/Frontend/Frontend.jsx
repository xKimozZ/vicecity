import Landscape from "./Landscape";
import { elementIds } from "../../constants/elementIds";
const { FRONTEND_ROOT_ID } = elementIds.FRONTEND;

const Frontend = () => {

  return (
    <div id={FRONTEND_ROOT_ID}>
      <Landscape />
      <div className="phone arborcrest arborcrestM">
        <div className="phoneContent">
        Portrait support currently unavailable.
        <br />
        <p style={{textAlign:"left"}}>Please rotate your device into landscape mode or increase the viewport width, or preferably access from a computer.</p>
        </div>
      </div>
    </div>
  );
}

export default Frontend;
