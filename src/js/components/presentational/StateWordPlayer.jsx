import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

import Player from './Player.jsx';

import playerStateMachine, { events, states } from '../../PlayerStateMachine.js';

let interval;

const StateWordPlayer = props => {
  const {
    sentence,
  } = props;

  const dynamicPlayerStateMachine = playerStateMachine.withContext({
      words: sentence.split(" "),
      speed: 0.1,
      currentWord: null,
      index: 0,
  });

  const [ current, send ] = useMachine(dynamicPlayerStateMachine);
  const { speed, word, index, words } = current.context

  const numberOfWords = words.length;

  const isPlaying = [states.PLAYING].includes(current.value);

  useEffect(() => {
    if(isPlaying) {
      clearInterval(interval); 
      interval = setInterval( () => {
        send(events.SHOW_WORD);
      }, (1 - speed) * 1000 );
    }
  }, [speed, current.value]);

  useEffect(() => {
    if(interval && !isPlaying) {
      clearInterval(interval);
    }
  }, [current.value]);

  const showPaused = isPlaying;
  const showPlay = [states.PAUSED, states.IDLE].includes(current.value);
  const showReplay = ![states.IDLE].includes(current.value);
  
  const percentage =  (index / numberOfWords ) * 100;

  return (
   <Player
      speed={speed}
      completedPercentage={ percentage }
      showPlaying={showPlay}
      showPaused={showPaused}
      showReplay={showReplay}
      onPlay={() => send(events.PLAY) }
      onReplay={() => send(events.RESTART) }
      onPause={() => send(events.PAUSE) }
      onScroll={value => send(events.SCROLL_BACK, { value }) }
      onSpeedScroll={ value => send(events.CHANGE_SPEED, { value }) }
    >
      <svg width="100%" height="100%">
        <text id='main-word' x="50%" y="50%" textAnchor="middle" fontSize='10vw' fill="white">{word}</text>
      </svg>
    </Player>
  );
};


StateWordPlayer.propTypes = {
  sentence: PropTypes.string.isRequired
};

export default StateWordPlayer;
