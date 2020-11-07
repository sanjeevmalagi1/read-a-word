import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useMachine } from '@xstate/react';

import Player from './Player.jsx';

import playerStateMachine, { events, states } from '../../PlayerStateMachine.js';

let interval;

const StateWordPlayer = props => {
  let highlight = null;

  const [ text, setText ] = useState('This is Sample text');
  const tokenizedSentence = text.split(" ");
  debugger;
  const dynamicPlayerStateMachine = playerStateMachine.withContext({
      words: tokenizedSentence,
      speed: Number(localStorage.getItem('speed')) || 0.5,
      currentWord: null,
      index: 0,
  });

  const [ scrollFollow, setScrollFollow ] = useState(true);
  
  const [ current, send ] = useMachine(dynamicPlayerStateMachine);
  const { speed, index, words } = current.context;
  const numberOfWords = words.length;
  const currentState = current.value;
  const word = words[index];

  const isPlaying = current.matches(states.PLAYING);

  const didMountRef = useRef(false);

  useEffect(() => {
    if(isPlaying) {
      clearInterval(interval); 
      interval = setInterval( () => {
        send(events.SHOW_WORD);
      }, (1 - speed) * 1000 );
    }
  }, [speed, currentState]);

  useEffect(() => {
    if(interval && !isPlaying) {
      clearInterval(interval);
    }
  }, [currentState]);

  useEffect(() => {
    if (didMountRef.current)
      localStorage.setItem('speed', speed)
    else
      didMountRef.current = true;
  }, [speed]);

  useEffect(() => {
    if(!highlight || !scrollFollow) {
      return;
    }
    if(highlight.scrollIntoViewIfNeeded) {
      highlight.scrollIntoViewIfNeeded(true);
      return;
    }
    if(highlight.scrollIntoView) {
      highlight.scrollIntoView();
      return;
    }
  }, [index])

  const percentage =  ((index+1) / numberOfWords ) * 100;

  const handleTextChange = (text) => {
    const words = text.split(" ");
    send(events.CHANGE_TEXT, { words });
    setText(text);
  };

  return (
   <Player
      speed={speed}
      completedPercentage={ percentage }
      showPlaying={current.nextEvents.includes(events.PLAY)}
      showPaused={current.nextEvents.includes(events.PAUSE)}
      showReplay={current.nextEvents.includes(events.RESTART)}
      scrollFollow={ scrollFollow }
      onPlay={() => send(events.PLAY) }
      onReplay={() => send(events.RESTART) }
      onPause={() => send(events.PAUSE) }
      onScroll={value => send(events.SCROLL_BACK, { value: value-1 }) }
      onSpeedScroll={ value => send(events.CHANGE_SPEED, { value }) }
      onScrollFollow={() => setScrollFollow(!scrollFollow) }
    >
      <svg width="100%" height="50%">
        <text id='main-word' x="50%" y="50%" textAnchor="middle" fontSize='10vw' fill="white">{word}</text>
      </svg>
      {/* <div className='preview-paragraph'>
        {
          words.map((word, sentenceIndex) => {
            const displayWord = `${word} `
            if(sentenceIndex == index) {
              return <span className='highlight' ref={ item => highlight = item } >{ displayWord }</span>
            }
            return displayWord;
          })
        }
      </div> */}
      <textarea
        className='preview-paragraph'
        onChange={(e) => handleTextChange(e.target.value)}
      >
        {text}
      </textarea>
    </Player>
  );
};


StateWordPlayer.propTypes = {
  sentence: PropTypes.string.isRequired
};

export default StateWordPlayer;
