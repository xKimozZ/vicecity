import { useReduxAbstractorContext } from '../../context/ReduxAbstractorContext';
import { useEventHandlerContext } from '../../context/EventHandlerContext';
import useKeyNavigation from '../../hooks/useKeyNavigation';
import { useEffect, useState } from 'react';
import '../../App.css';
import Header from '../Header/Header';
import Button from '../Button/Button'
import menuOptions from '../../constants/menuOptions';
import Cursor from '../Cursor/Cursor'
import { imageImports } from '../../assets/imageImports';
import { buttonGroups } from '../../constants/buttonGroups';
import { elementIds } from '../../constants/elementIds';
import NavigationTips from '../NavigationTips/NavigationTips';

const { FRONTEND_CONTAINER_ID, FRONTEND_BACKGROUND_ID } = elementIds.FRONTEND;

const Landscape = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { hoveredOption, nextButtonGroup, activeButtonGroup } = selectorAbstractor.navigationState;
  const menuButtonStrings = selectorAbstractor.localizationState.stringMenuState;
  
  const { handleHover, handleSelect, handleError, handleBack, handleInfo } = useEventHandlerContext();
  const optionsPerRow = [4,4];
  useKeyNavigation(optionsPerRow);

  const [clipPathStyle, setClipPathStyle] = useState(
    {
      transition: '0.1s linear',
      clipPath: menuOptions[0].frameClip,
    }
  );
  const [clipPathContainer, setClipPathContainer] = useState([]);
  const [componentContainer, setComponentContainer] = useState([]);

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

    const BOTTOM_CURSOR_FACTORS = {
      clipFactor: 13,
      topFactor: 0.99,
      leftFactor: 0.99,
      widthFactor: 1.15,
      heightFactor: 2,
      minHeightFactor: 1.4,
      minWidthFactor: 1.02,
      maxLeftFactor: 0.995,
      maxTopFactor: 0.995,
    };
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
            additionalClassnames={['bottomButtons']}
            cursorFactors={BOTTOM_CURSOR_FACTORS}
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

  return (
    <>
      <Cursor />
      <div id={FRONTEND_BACKGROUND_ID} className="backgroundElement" style={{...clipPathStyle }}/>
      <div id={FRONTEND_CONTAINER_ID} className={` AppContainer `}>
      <img src={imageImports.global.vclogo1024} className="viceLogo" />
      <NavigationTips />
      <Header />
      <div className="App" onClick={ activeButtonGroup === buttonGroups.MAIN ? ()=>handleSelect() : undefined}>
          {renderHoveredComponent()}
      </div>
      <div className='bottomButtonContainer' onClick={ activeButtonGroup !== buttonGroups.MAIN ? ()=>handleBack(1) : undefined }>
      <div className="bottomButtonRow">
          {renderButtons(0, optionsPerRow[0]) }
        </div>
        <div className="bottomButtonRow">
          {renderButtons(optionsPerRow[1], menuOptions.length) }
        </div>
      </div>
    </div>
    </>
  );
}

export default Landscape;
