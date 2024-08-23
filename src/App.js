import './App.css';
import Button from './components/Button/Button'
import { useEffect, useState, useRef } from 'react';
import { menuOptions } from './constants/menuOptions';
import { useSelector } from 'react-redux';
import Cursor from './components/Cursor/Cursor'
import useEventHandler from './hooks/useEventHandler';
import useKeyNavigation from './hooks/useKeyNavigation';
import { imageImports } from './assets/imageImports';
import LanguageMenu from './components/MenuComponents/LanguageMenu/LanguageMenu';
import { navigationSelector, setHoveredOption } from './store/navigationSlice';

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
  const { handleKeyDown } = useKeyNavigation(optionsPerRow);
  const { hoveredOption } = useSelector(navigationSelector);
  const { handleHover, handleSelect, handleError, handleBack, handleInfo } = useEventHandler();


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

  useEffect(() =>
  {
    handleInfo(); 
  },[]);

    useEffect(() => {
      interfaceRef.current.focus();
    }, []);

    const handleMargin = () => {
      handleSelect();
      interfaceRef.current.focus();
      setMarginState(!marginState)
    };

  return (
    <>
      <Cursor />
    <div className={`${marginState ? 'margin' : ''} AppContainer`}>
      <div style={{position:'fixed',left:'40%', top:'10px', zIndex:9999}}>
        <Button textColor='var(--pink)' buttonText='margin' buttonNumber={69} hoverFunction={handleHover} selectFunction={handleMargin}/>
      </div>
      <img src={imageImports.global.vclogo1024} className="viceLogo" />
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
    </>
  );
}

export default App;
