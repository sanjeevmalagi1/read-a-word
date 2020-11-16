
import React from "react";
import PropTypes from "prop-types";

import Slider from './Slider.jsx';

const Player = (props) => {
  const {
    children,
    currentWord,
    numberOfWords,
    speed,
    showPlaying,
    showPaused,
    showReplay,
    scrollFollow,
    onPlay,
    onReplay,
    onPause,
    onScroll,
    onSpeedScroll,
    onScrollFollow,
  } = props;

  const transitionSpeed = ((1 / speed) * 60);  
        
  return (
    <div id="player" className="player">
      {children}
      <div className="bottom-menu">
        <div className="bottom-menu-container">
          <Slider
            currentValue={currentWord}
            minValue={0}
            maxValue={numberOfWords-1}
            transitionSpeed={transitionSpeed}
            onChange={newValue => onScroll(newValue)}
          />

          <div className="controls">
            {/* <div className='menu-item'>
              <i onClick={() => onScrollFollow() } data-active={scrollFollow} className="menu-icon material-icons">playlist_play</i>
            </div> */}
            <div className='menu-item'>
              { showPaused && <i onClick={() => onPause() } className="menu-icon material-icons">pause</i> }
            </div>
            <div className='menu-item'>
              { showReplay &&  <i onClick={() => onReplay() } className="menu-icon material-icons">replay</i>}
            </div>
            <div className='menu-item'>
              { showPlaying && <i onClick={() => onPlay() } className="menu-icon material-icons">play_arrow</i> }
            </div>
            <div className='menu-item' style={{ width: 200 }}>
              <div style={{ width: 100 }}>
                <Slider
                  currentValue={speed}
                  minValue={50}
                  maxValue={900}
                  transitionSpeed={0}
                  onChange={newValue => onSpeedScroll(newValue)}
                />
              </div>
              <div style={{ marginLeft: 5 }}>
                {speed} wpm
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
}

Player.propTypes = {
  children: PropTypes.object.isRequired,
  currentWord: PropTypes.number.isRequired,
  numberOfWords: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  showPlaying: PropTypes.bool.isRequired,
  showPaused: PropTypes.bool.isRequired,
  showReplay: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onReplay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
  onSpeedScroll: PropTypes.func.isRequired,
};

export default Player;