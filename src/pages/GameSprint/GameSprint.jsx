import React, {useState, useEffect, useMemo} from 'react';
import Service from '../../services';
import Game from './components/Game';
import StartScreen from '../../components/gameComponents/StartScreen/';
import Statistics from '../../components/gameComponents/Statistics';

import classes from './GameSprint.module.scss';

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

function GameSprint() {
  const [initGame, setInitGame] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [learnedWords, setLearnedWords] = useState(false);
  const [words, setWords] = useState([]);
  const [results, setResults] = useState([]);
  const [level, setLevel] = useState(1);
  const [load, setLoad] = useState(false);
  const [soundStatus, setSoundStatus] = useState(true);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    setLoad(true);
    api
      .getWordsAll(level - 1)
      .then((data) => action(data))
      .catch((error) => console.error(error))
      .finally(() => setLoad(false));
    return () => setWords([]);
  }, [api, level]);

  const action = (data) => {
    /* const path = learnedWords ? data[0].paginatedResults : data; */
    data.forEach((el) => {
      el.falsyTranslate = el.wordTranslate;
    });
    data.forEach((el) => {
      el.falsyTranslate = getRandomInt(2)
        ? data[getRandomInt(data.length - 1)].falsyTranslate
        : el.falsyTranslate;
      el.correctFlag = el.falsyTranslate === el.wordTranslate;
    });
    setWords(data);
  };

  return (
    <div className={classes['container-sprint']}>
      {gameOver ? (
        <Statistics results={results} setSoundStatus={setSoundStatus} soundStatus={soundStatus} />
      ) : null}
      {initGame && !gameOver ? (
        <Game
          setGameOver={setGameOver}
          setResults={setResults}
          setWords={setWords}
          setStartGame={setStartGame}
          setSoundStatus={setSoundStatus}
          words={words}
          startGame={startGame}
          results={results}
          load={load}
          soundStatus={soundStatus}
        ></Game>
      ) : null}
      {!gameOver && !initGame ? (
        <StartScreen
          name="Спринт"
          iconName="fas fa-running"
          description="Игра учит быстро переводить слова."
          setInitGame={setInitGame}
          setLevel={setLevel}
          setLearnedWords={setLearnedWords}
          level={level}
          learnedWords={learnedWords}
        ></StartScreen>
      ) : null}
    </div>
  );
}

export default GameSprint;
