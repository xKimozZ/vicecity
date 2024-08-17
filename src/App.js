import logo from './logo.svg';
import './App.css';
import vclogo from './assets/vclogo1024.png';
import Button from './components/Button/Button'
import useSound from 'use-sound';
import { useEffect, useState } from 'react';
import hoverRight from "./assets/hoverright.wav";
import hoverLeft from "./assets/hoverleft.wav";
import selectRight from "./assets/selectright.wav";
import selectLeft from "./assets/selectleft.wav";
import backLeft from "./assets/backleft.wav";
import backRight from "./assets/backright.wav";
import errorLeft from "./assets/errorleft.wav";
import errorRight from "./assets/errorright.wav";
import infoLeft from './assets/infoleft.wav'
import infoRight from './assets/inforight.wav'
import infoEcho from './assets/infoecho.wav'
import { menuOptions } from './constants/menuOptions';

function App() {
  const [playHoverRight] = useSound(hoverRight);
  const [playHoverLeft] = useSound(hoverLeft);
  const [playSelectRight] = useSound(selectRight);
  const [playSelectLeft] = useSound(selectLeft);
  const [playBackRight] = useSound(backRight, { preload: true });
  const [playBackLeft] = useSound(backLeft, { preload: true });
  const [playErrorRight] = useSound(errorRight, { preload: true });
  const [playErrorLeft] = useSound(errorLeft, { preload: true });
  const [playInfoRight] = useSound(infoRight, { preload: true });
  const [playInfoLeft] = useSound(infoLeft, { preload: true });
  const [playInfoEcho] = useSound(infoEcho, { preload: true });

  const [hoveredOption, setHoveredOption] = useState(1);

  const renderButtons = (start, end) => {
    const menuRow = menuOptions.slice(start,end);
    return (
      <>
        {
          menuRow.map((option) => (
          <Button
            key={option.buttonNumber}
            buttonNumber={option.buttonNumber}
            buttonText={option.buttonText}
            hoverFunction={handleHover}
            selectFunction={handleSelect}
            hoveredOption={hoveredOption}
            setHoveredOption={setHoveredOption}
          />
        ))}
      </>
    );
  };

  const handleInfo = () => {
    playInfoRight();
    playInfoLeft();
    playInfoEcho();
  };

  const handleHover = () => {
    playHoverRight();
    playHoverLeft();
  };

  const handleSelect = () => {
    playSelectRight();
    playSelectLeft();
  };

  const handleBack = () => {
    console.log('back');
    playBackRight();
    playBackLeft();
  };

  const handleError = () => {
    console.log('error');
    playErrorRight();
    playErrorLeft();
  };

  useEffect(() =>
  {
    handleInfo(); 
  },[]);

const handleKeyDown = (event) => {
      console.log(event);
      if (event.key === "Escape") {
        handleBack();
      }
      if (event.key === "Backspace") {
        handleError();
      }
      if (event.key === "Enter") {
        handleSelect();
      }
      if (event.key === "ArrowRight") {
        handleHover();
        if (hoveredOption + 1 > 8)
          setHoveredOption(hoveredOption - 3);
        else if (hoveredOption + 1 === 5)
          setHoveredOption(hoveredOption - 3)
        else
        setHoveredOption(hoveredOption+1);
      }
      if (event.key === "ArrowLeft") {
        handleHover();
        if (hoveredOption - 1 < 1)
          setHoveredOption(hoveredOption + 3);
        else if (hoveredOption - 1 === 4)
          setHoveredOption(hoveredOption + 3)
          else
        setHoveredOption(hoveredOption - 1);
      }
      if (event.key === "ArrowDown") {
        handleHover();
        if (hoveredOption + 4 > 8)
          setHoveredOption( hoveredOption - 4);
        else
        setHoveredOption(hoveredOption+4);
      }
      if (event.key === "ArrowUp") {
        handleHover();
        if (hoveredOption - 4 < 1)
          setHoveredOption(hoveredOption + 4);
        else
        setHoveredOption(hoveredOption-4);
      }
    };

  return (
    <div>
      <img src={vclogo} className="viceLogo" />
      <div
        className="App"
        onKeyDown={handleKeyDown} // Attach the onKeyDown event here
        tabIndex="0"
      >
      </div>
      <div style={{display:'flex',alignItems:'center',flexDirection:'column',  position:'absolute', bottom:'8%', width:'100%', backgroundColor:'black'}}
      onKeyDown={handleKeyDown} tabIndex="0">
      <div className="frame">
          {renderButtons(0,4) }
        </div>
        <div className="frame">
          {renderButtons(4,8) }
        </div>

      </div>
    </div>
  );
}

export default App;
