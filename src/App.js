import { useReduxAbstractorContext } from './context/ReduxAbstractorContext';
import { useEventHandlerContext } from './context/EventHandlerContext';
import useKeyNavigation from './hooks/useKeyNavigation';
import { useEffect, useState, useRef } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Button from './components/Button/Button'
import menuOptions from './constants/menuOptions';
import Cursor from './components/Cursor/Cursor'
import { imageImports } from './assets/imageImports';
import { actionNames } from './constants/actionNames';
import { buttonGroups } from './constants/buttonGroups';

function App() {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { hoveredOption, nextButtonGroup, activeButtonGroup, bigHover } = selectorAbstractor.navigationState;
  const { displaySettings } = selectorAbstractor.miscState;
  const menuButtonStrings = selectorAbstractor.localizationState.stringMenuState;
  
  const { handleHover, handleSelect, handleError, handleBack, handleInfo } = useEventHandlerContext();
  const optionsPerRow = [4,4];
  const [marginState, setMarginState] = useState(false);
  const [clipPathStyle, setClipPathStyle] = useState(
    {
      transition: '0.1s linear',
      clipPath: menuOptions[0].frameClip,
    }
  );
  const [clipPathContainer, setClipPathContainer] = useState([]);
  const [componentContainer, setComponentContainer] = useState([]);
  const interfaceRef = useRef(null);
  const { handleKeyDown } = useKeyNavigation(optionsPerRow);


  useEffect(() => {
    const newClipPaths = menuOptions.map((option) => {
      return option.frameClip;
    });
    setClipPathContainer(newClipPaths);

    const newComponents = menuOptions.map((option) => {
      return option.component;
    });
    setComponentContainer(newComponents);
  }, []);

  const renderButtons = (start, end) => {
    const menuRow = menuOptions.slice(start,end);
    const indexOffset = start + 1; // To minimise dependency on hardcoded buttonNumber's

    return (
      <>
        {
          menuRow.map((option, index ) => (
          <Button
            key={option.buttonNumber}
            buttonNumber={index + indexOffset}
            buttonText={menuButtonStrings[option.buttonText]}
            buttonGroup={option.buttonGroup}
            actions={option.actions}
          />
        ))}
      </>
    );
  };

  const renderHoveredComponent = () => {
    if (hoveredOption > 0 ) {
      const ComponentToRender = componentContainer[nextButtonGroup - 1]; // assuming hoveredOption starts from 1
      return ComponentToRender ? <ComponentToRender /> : null; // Render component if it exists
    }
    return null;
  };

  useEffect(() => {
    if (clipPathContainer.length === 0)
      return;
    
    setClipPathStyle({
      transition: '0.1s linear', // Apply transition
      clipPath: clipPathContainer[nextButtonGroup - 1] ? clipPathContainer[nextButtonGroup - 1] : menuOptions[0].frameClip,
    });
  },[nextButtonGroup]);

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

    const {SCREENPOS_ID} = actionNames.DISPLAY;

    const fakeScreenPosStyle = {
      position: "fixed",
      top: "6px",
      left: "6px",
      height: "calc(99.3vh - 12px)",
      width: "calc(99.3vw - 12px)",
      border: "6px solid yellow"
    };

    const screenPosStyle = {
      transform: `translate(${displaySettings[SCREENPOS_ID].x}px, ${displaySettings[SCREENPOS_ID].y}px)`,
    };

  return (
    <>
      <Cursor />
      {bigHover.active && bigHover.myId === SCREENPOS_ID && <div style={{...fakeScreenPosStyle, ...screenPosStyle}}/>}
      <div className="backgroundElement" style={{...clipPathStyle, ...screenPosStyle}}/>
      <div className={`${marginState ? 'margin' : ''} AppContainer`} style={{...screenPosStyle}}>
      <div style={{position:'fixed',left:'40%', top:'10px', zIndex:9999}} onClick={handleMargin}>
        <Button textColor='var(--pink)' buttonText='margin' buttonNumber={69} buttonGroup='DEBUG'/>
      </div>
      <img src={imageImports.global.vclogo1024} className="viceLogo" />
      <Header />
      <div
        className="App"
        onKeyDown={handleKeyDown} // Attach the onKeyDown event here
        tabIndex="0"
        >
          {renderHoveredComponent()}
      </div>
      <div className='buttonContainer' ref={interfaceRef}
      onKeyDown={handleKeyDown} tabIndex="0" onClick={()=> {if (activeButtonGroup !== buttonGroups.MAIN) handleBack(1)}}>
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
