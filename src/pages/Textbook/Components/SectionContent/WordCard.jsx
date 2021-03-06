import React, { useEffect, useMemo, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Audio from '../Audio/';
import classes from './SectionContent.module.scss';
import Service from '../../../../services';
import Error from '../../../../components/Error';
import { updateWord } from '../../utils/queries';
import { isAuth, setBtnDisabled } from '../../utils/functions';
import DifficultyMarker from '../DifficultyMarker/DifficultyMarker';
import Player from '../Audio/Player';

const WordCard = ({
  wordObj,
  currentTheme,
  setIsDeleted,
  setIsUpdated,
  setMessage,
  difficultyDisable,
  dictionarySection,
}) => {
  const api = useMemo(() => new Service(), []);
  const baseUrl = 'https://apprslang.herokuapp.com/';

  const settingBtn = useSelector((state) => state.settings.showButtons);
  const settingTranslate = useSelector((state) => state.settings.showTranslate);
  const [showHeader, setShowHeader] = useState(settingBtn);
  const [showTranslate, setShowTranslate] = useState(settingTranslate);
  const [button, setButton] = useState('Удалить');
  const [btnMode, setBtnMode] = useState('d');
  const [checkDifficult, setCheckDifficult] = useState(difficultyDisable);
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState('fa-trash-alt');
  const [btnColor, setBtnColor] = useState('btn-outline-danger');
  const mode = localStorage.getItem('userPage') || 'textbook';

  const imgURL = `${baseUrl}${wordObj.image}`;
  const audioURL = `${baseUrl}${wordObj.audio}`;
  const audioMeaningURL = `${baseUrl}${wordObj.audioMeaning}`;
  const audioExampleURL = `${baseUrl}${wordObj.audioExample}`;
  const flow = [audioURL, audioMeaningURL, audioExampleURL];
  const id = mode === 'textbook' ? wordObj.id : wordObj._id;

  useEffect(() => {
    setBtnDisabled(id, difficultyDisable);
  }, [wordObj]);

  useEffect(() => {
    setShowHeader(settingBtn);
  }, [settingBtn]);

  useEffect(() => {
    setBtnDisabled(id, checkDifficult);
  }, [showHeader])

  useEffect(() => {
    setShowTranslate(settingTranslate);
  }, [settingTranslate]);

  useEffect(() => {
    if (mode === 'dictionary') {
      if (!!dictionarySection.toString().match('1|2')) {
        setShowHeader(true);
        setCheckDifficult(false);
        setButton('Восстановить');
        setIcon('fa-trash-restore-alt');
        setBtnColor('btn-success');
        setBtnMode('r');
      } else {
        setShowHeader(false);
      }
    }
    return () => {
      setShowHeader(settingBtn);
    };
  }, [mode, dictionarySection]);

  const updateCurrentWord = (id, mode) => {
    const result = updateWord(api, id, mode);
    if (!result.error) {
      setMessage(result.message);
      if (mode === 'u') {
        setBtnDisabled(id, true);
        setCheckDifficult(true);
      }
      if (mode === 'd') {
        setIsDeleted(id);
      }
      if (mode === 'r') {
        setIsUpdated(id);
      }
      return;
    }
    setError(result.error);
    console.log('error', result.error);
  };

  return (
    <div className={classes.wordCard}>
      <div className="card text-white bg-light mr-5 ml-5 mb-5">
        {showHeader && isAuth() ? (
          <div className="card-header d-flex justify-content-between">
            {mode === 'textbook' ? (
              <button
                id={`difficultyBtn${wordObj.id}`}
                type="button"
                className={`btn btn-outline-secondary`}
                onClick={() => updateCurrentWord(id, 'u')}
              >
                <i className="fas fa-brain mr-2"></i>
                Сложное слово
              </button>
            ) : null}
            <button
              type="button"
              className={`btn ${btnColor}`}
              onClick={() => updateCurrentWord(id, btnMode)}
            >
              <i className={`fas ${icon} mr-2`}></i>
              {button}
            </button>
          </div>
        ) : null}

        <div className={`card-body ${classes.item}`}>
          {checkDifficult && <DifficultyMarker />}
          <div className={`${classes.card} card-body`}>
            <div
              className={`${classes.image} card-body p-0 `}
              style={{
                backgroundImage: `url(${imgURL})`,
              }}
            />
            <div className="card-body align-self-start p-0 ml-2">
              <div className=" d-flex flex-column m-0">
                <h4 className="card-title">{`${wordObj.word} ${wordObj.transcription}`}</h4>
                {showTranslate && (
                  <h5 className="card-text text-dark">
                    {' '}
                    {wordObj.wordTranslate}
                  </h5>
                )}
              </div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-text">
              <div
                dangerouslySetInnerHTML={{ __html: wordObj.textExample }}
              ></div>
            </h5>
            {showTranslate && (
              <p className="card-text text-dark">
                {wordObj.textExampleTranslate}
              </p>
            )}
          </div>
        </div>

        <div
          className={`card-footer d-flex justify-content-between bg-${currentTheme}`}
        >
          <Player
            flow={flow}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTheme: state.theme.value,
  };
};

export default connect(mapStateToProps, null)(WordCard);
