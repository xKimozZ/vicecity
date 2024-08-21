import logo from './logo.svg';
import './App.css';
import vclogo from './assets/vclogo1024.png';
import Button from './components/Button/Button'
import { useEffect, useState, useRef } from 'react';
import { menuOptions } from './constants/menuOptions';
import { Provider } from 'react-redux';
import { store } from './store/store'
import Cursor from './components/Cursor/Cursor'
import useSoundManager from './hooks/useSoundManager';

function App() {
  const optionsPerRow = [4,4];
  const [marginState, setMarginState] = useState(false);
  const [clipPathStyle, setClipPathStyle] = useState(
    {
      transition: '0.1s linear',
      clipPath: menuOptions[0].frameClip,
    }
  );
  const [clipPathContainer, setClipPathContainer] = useState([]);
  const interfaceRef = useRef(null);
  const [hoveredOption, setHoveredOption] = useState(1);
  const { playHover, playSelect, playBack, playError, playInfo } = useSoundManager();


  useEffect(() => {
    const newClipPaths = menuOptions.map((option) => {
      return option.frameClip;
    });
    setClipPathContainer(newClipPaths);
  }, []);

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

  

  useEffect(() => {
    if (clipPathContainer.length === 0)
      return;
    setClipPathStyle({
      transition: '0.1s linear', // Apply transition
      clipPath: clipPathContainer[hoveredOption-1] ? clipPathContainer[hoveredOption-1] : menuOptions[0].frameClip,
    });
  },[hoveredOption]);

  const handleInfo = () => {
    playInfo();
  };

  const handleHover = () => {
    playHover();
  };

  const handleSelect = () => {
    playSelect();
  };

  const handleBack = () => {
    playBack();
  };

  const handleError = () => {
    playError();
  };

  useEffect(() =>
  {
    playInfo(); 
  },[]);

const handleKeyDown = (event) => {
      const firstRowStart = 1;
      const firstRowEnd = optionsPerRow[0];
      const secondRowStart = optionsPerRow[1] + 1;
      const secondRowEnd = menuOptions.length;
      const vertical = menuOptions.length / 2;

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
        if (hoveredOption + 1 > secondRowEnd)
          setHoveredOption( secondRowStart );
        else if (hoveredOption + 1 === firstRowEnd + 1)
          setHoveredOption( firstRowStart )
        else
        setHoveredOption(hoveredOption+1);
      }
      if (event.key === "ArrowLeft") {
        handleHover();
        if (hoveredOption - 1 < firstRowStart)
          setHoveredOption(firstRowEnd);
        else if (hoveredOption - 1 === secondRowStart - 1)
          setHoveredOption( secondRowEnd )
          else
        setHoveredOption(hoveredOption - 1);
      }
      if (event.key === "ArrowDown") {
        handleHover();
        if (hoveredOption + vertical > secondRowEnd)
          setHoveredOption( hoveredOption - vertical);
        else
        setHoveredOption(hoveredOption + vertical);
      }
      if (event.key === "ArrowUp") {
        handleHover();
        if (hoveredOption - vertical < firstRowStart)
          setHoveredOption(hoveredOption + vertical);
        else
        setHoveredOption(hoveredOption- vertical);
      }
    };

    useEffect(() => {
      interfaceRef.current.focus();
    }, []);

    const handleMargin = () => {
      handleSelect();
      interfaceRef.current.focus();
      setMarginState(!marginState)
    };

  return (
    <Provider store={store}>
    <div className={`${marginState ? 'margin' : ''} AppContainer`}>
      <Cursor />
      <div style={{position:'fixed',left:'40%', top:'10px', zIndex:9999}}>
        <Button textColor='pink' buttonText='margin' buttonNumber={69} hoveredOption={hoveredOption} setHoveredOption={setHoveredOption} hoverFunction={handleHover} selectFunction={handleMargin}/>
      </div>
      <img src={vclogo} className="viceLogo" />
      <div
        className="App"
        onKeyDown={handleKeyDown} // Attach the onKeyDown event here
        tabIndex="0"
        style={clipPathStyle}
        >
      </div>
      <div className='buttonContainer' ref={interfaceRef}
      onKeyDown={handleKeyDown} tabIndex="0">
      <div className="frame">
          {renderButtons(0, optionsPerRow[0]) }
        </div>
        <div className="frame">
          {renderButtons(optionsPerRow[1], menuOptions.length) }
        </div>

      </div>
    </div>
        </Provider>
  );
}

export default App;
