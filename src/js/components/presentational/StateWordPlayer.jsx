import React, { useEffect } from "react";
import PropTypes from "prop-types";
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
      speed: 0.5,
      currentWord: null,
      index: 0,
  });

  const [ current, send ] = useMachine(dynamicPlayerStateMachine);
  const { speed, word, index, words } = current.context
  const numberOfWords = words.length;
  const currentState = current.value;

  const isPlaying = current.matches(states.PLAYING);

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

  const percentage =  (index / numberOfWords ) * 100;

  return (
   <Player
      speed={speed}
      completedPercentage={ percentage }
      showPlaying={current.nextEvents.includes(events.PLAY)}
      showPaused={current.nextEvents.includes(events.PAUSE)}
      showReplay={current.nextEvents.includes(events.RESTART)}
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
