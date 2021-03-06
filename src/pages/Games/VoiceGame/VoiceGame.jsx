import {React, useState } from 'react';
import { NavLink } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import './css/voice.css';
import Newgamebutton from './components/Newgamebutton';
import Statistics from './components/Statistics';
import Gamefield from './components/Gamefield';
import Complexity from './components/Complexity';
import { connect } from 'react-redux';

const VoiceGame = (props) => {

  const [classFullScreen, setFullScreen] = useState("voice-game-field");
  const [gameStart, setGameStart] = useState(false);
  const [lifes, setLifes] = useState(5);
  const [points, setPoints] = useState(0);
  const [complexity, setComplexity] = useState(0);

  let menu;
  if(Object.keys(props.gameInfo).length === 0) {
    menu = true;
  } else {
    menu = false;
  }


  const handle = useFullScreenHandle();
  
  function changeFullScreen() {
    if (!document.fullscreenElement) {
      handle.enter();
      setFullScreen("voice-game-field--full-screen");
    } else {
      handle.exit();
      setFullScreen("voice-game-field");
    }
  }

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      setFullScreen("voice-game-field");
    }
  })

  function changeGameStart() {
    setGameStart(true);
  }

  function plusPoint() {
    setPoints(points + 1);
  }

  function minusLife() {
    setLifes(lifes - 1);
  }

  function changeComplexity(e) {
    setComplexity(e.target.value);
  }


  return (
    <>
    <NavLink to="/games" className="back-to-menu"></NavLink>
    <h2 className="savanna-title">Игра Голос</h2>
      <FullScreen handle={handle}>
        <div className={classFullScreen}> 
          <Newgamebutton changeGameStart={changeGameStart} gameStart={gameStart}/>
          <button className="full-screen-button" onClick={changeFullScreen}></button>
          
          {gameStart
          ? <>
            <Statistics lifes={lifes} points={points}/>
            <Gamefield complexity={complexity} minusLife={minusLife} lifes={lifes} points={points} plusPoint={plusPoint} />
            </>
          : <Complexity menu={menu} changeComplexity={changeComplexity}/>
          }
          
        </div>     
      </FullScreen>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    
    gameInfo: state.gameInfo,
  };
};

export default connect(mapStateToProps, null)(VoiceGame);