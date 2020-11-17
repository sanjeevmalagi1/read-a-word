import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useMachine } from '@xstate/react';

import Player from './Player.jsx';

import playerStateMachine, { events, states } from '../../PlayerStateMachine.js';

let interval;

const StateWordPlayer = props => {
  let highlight = null;

  const [ text, setText ] = useState('Press play button to play the text one word at a time. This will greatly increase the reading speed. You can also copy and paste your own text to here.');
  const tokenizedSentence = text.match(/.*?[\.\s]+?/g);
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
      const intervalTime = ((1 / speed) * 60) * 1000;
      interval = setInterval( () => {
        send(events.SHOW_WORD);
      }, intervalTime );
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

  const handleClearText = () => {
    const words = ''.split(" ");
    send(events.CHANGE_TEXT, { words });
    setText('');
  };

  const handlePasteClipboard = () => {
    navigator.clipboard.readText().then(text => {
      if (!text) {
        alert('Your clipboard is empty. Please copy some text');
        return;
      }
      const words = text.split(" ");
      send(events.CHANGE_TEXT, { words });
      setText(text);
    });
  };

  const handleScrollChange = value => {
    send(events.SCROLL_BACK, { value: parseInt(value) });
  };

  return (
   <Player
      currentWord={index}
      numberOfWords={numberOfWords}
      speed={speed}
      completedPercentage={ percentage }
      showPlaying={current.nextEvents.includes(events.PLAY)}
      showPaused={current.nextEvents.includes(events.PAUSE)}
      showReplay={current.nextEvents.includes(events.RESTART)}
      scrollFollow={ scrollFollow }
      onPlay={() => send(events.PLAY) }
      onReplay={() => send(events.RESTART) }
      onPause={() => send(events.PAUSE) }
      onScroll={handleScrollChange}
      onSpeedScroll={ value => send(events.CHANGE_SPEED, { value }) }
      onScrollFollow={() => setScrollFollow(!scrollFollow) }
    >
      <div className="word-container">
        {word}
      </div>
      <div className='preview-paragraph-container'>
        <textarea
          className='preview-paragraph'
          onChange={(e) => handleTextChange(e.target.value)}
          value={text}
        ></textarea>
        <div className='text-controls'>
          <button onClick={() => handleClearText() } className='text-control-btn'>
            <i className="material-icons">clear</i>
            Clear
          </button>
          <button onClick={() => handlePasteClipboard()} className='text-control-btn'>
            <i className="material-icons">content_paste</i>
            Paste
          </button>
        </div>
      </div>
      
    </Player>
  );
};


StateWordPlayer.propTypes = {
};

export default StateWordPlayer;
