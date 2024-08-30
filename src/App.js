import './App.css';
import Button from './components/Button/Button'
import { useEffect, useState, useRef } from 'react';
import useMenuOptions from './hooks/useMenuOptions';
import { useSelector } from 'react-redux';
import Cursor from './components/Cursor/Cursor'
import useEventHandler from './hooks/useEventHandler';
import useKeyNavigation from './hooks/useKeyNavigation';
import { imageImports } from './assets/imageImports';
import LanguageMenu from './components/MenuComponents/LanguageMenu/LanguageMenu';
import { navigationSelector, setHoveredOption } from './store/navigationSlice';
import { buttonGroupMap, buttonGroups } from './constants/buttonGroups';
import getNextGroupIndex from './utils/getNextGroupIndex';
import { menuStrings } from './constants/menuStrings';
import Header from './components/Header/Header';

function App() {
  const menuOptions = useMenuOptions();
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
  const { hoveredOption, nextButtonGroup, activeButtonGroup } = useSelector(navigationSelector);
  const { handleHover, handleSelect, handleError, handleBack, handleInfo } = useEventHandler();


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
            buttonText={option.buttonText}
            buttonGroup={option.buttonGroup}
            actions={option.actions}
          />
        ))}
      </>
    );
  };

  const renderHoveredComponent = () => {
    if (hoveredOption > 0 ) {
      const nextButtonGroupIndex = getNextGroupIndex(nextButtonGroup);
      const ComponentToRender = componentContainer[nextButtonGroupIndex - 1]; // assuming hoveredOption starts from 1
      return ComponentToRender ? <ComponentToRender /> : null; // Render component if it exists
    }
    return null;
  };

  useEffect(() => {
    if (clipPathContainer.length === 0)
      return;
    
    const nextButtonGroupIndex = getNextGroupIndex(nextButtonGroup);
    setClipPathStyle({
      transition: '0.1s linear', // Apply transition
      clipPath: clipPathContainer[nextButtonGroupIndex - 1] ? clipPathContainer[nextButtonGroupIndex - 1] : menuOptions[0].frameClip,
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

  return (
    <>
      <Cursor />
    <div className={`${marginState ? 'margin' : ''} AppContainer`}>
      <div style={{position:'fixed',left:'40%', top:'10px', zIndex:9999}} onClick={handleMargin}>
        <Button textColor='var(--pink)' buttonText='margin' buttonNumber={69} buttonGroup='DEBUG'/>
      </div>
      <img src={imageImports.global.vclogo1024} className="viceLogo" />
      <Header />
      <div
        className="App"
        onKeyDown={handleKeyDown} // Attach the onKeyDown event here
        tabIndex="0"
        style={clipPathStyle}
        >
          <Cursor />
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
