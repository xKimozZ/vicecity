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
    };

  async function pbr() {
    const audio = new Audio(backRight);
    audio.volume = 1.0; // Ensure volume is set
    audio.play().catch(err => console.error("Audio playback error:", err));
  };

  async function pbl() {
    const audio = new Audio(backLeft);
    audio.volume = 1.0; // Ensure volume is set
    audio.play().catch(err => console.error("Audio playback error:", err));
  };

  async function pel() {
    const audio = new Audio(errorLeft);
    audio.volume = 1.0; // Ensure volume is set
    audio.play().catch(err => console.error("Audio playback error:", err));
  };

  async function per() {
    const audio = new Audio(errorRight);
    audio.volume = 1.0; // Ensure volume is set
    audio.play().catch(err => console.error("Audio playback error:", err));
  };

  const pb = () => {
    pbl();
    pbr();
  };

  const pe = () => {
    pel();
    per();
  };

  return (
    <div>
    <img src={vclogo} className='viceLogo'/>
    <div className="App" onKeyDown={handleKeyDown} // Attach the onKeyDown event here
      tabIndex="0">
      <div className="frame">
        <Button buttonText={'map'} hoverFunction={handleHover} selectFunction={handleSelect}/>
        <Button buttonText={'load'} hoverFunction={handleHover} selectFunction={handleSelect}/>
        <Button buttonText={'brief'} hoverFunction={handleHover} selectFunction={handleSelect}/>
        <Button buttonText={'stats'} hoverFunction={handleHover} selectFunction={handleSelect}/>
        <Button buttonText={'controls'} hoverFunction={handleHover} selectFunction={handleSelect}/>
        <Button buttonText={'sound'} hoverFunction={handleHover} selectFunction={handleSelect}/>
        <Button buttonText={'language'} hoverFunction={handleHover} selectFunction={handleSelect}/>
        <Button buttonText={'credits'} hoverFunction={handleHover} selectFunction={handleSelect}/>
        <Button buttonText={'error'} hoverFunction={handleBack} selectFunction={handleError}/>
        <Button buttonText={'error'} hoverFunction={pb} selectFunction={pe}/>
      </div>
    </div>
    </div>
  );
}

export default App;
