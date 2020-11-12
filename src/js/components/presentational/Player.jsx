
import React from "react";
import PropTypes from "prop-types";

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

  const percentage =  ((currentWord+1) / numberOfWords ) * 100;

  return (
    <div id="player" className="player">
      {children}
      <div className="bottom-menu">
        <div className="bottom-menu-container">
          <input value={currentWord} onChange={e => onScroll(parseFloat(e.target.value)) } type="range" min={0} max={numberOfWords-1} className="slider" />
          <div className='filler-container' style={{ width: '100%' }}>
            <div className='filler' style={{ width: `calc(${percentage}% + 5px)`, transition: `width ${(1 - speed)}s linear 0s ` }}></div>
          </div>
          <div className="controls">
            <div className='menu-item'>
              <i onClick={() => onScrollFollow() } data-active={scrollFollow} className="menu-icon material-icons">playlist_play</i>
            </div>
            <div className='menu-item'>
              { showPaused && <i onClick={() => onPause() } className="menu-icon material-icons">pause</i> }
            </div>
            <div className='menu-item'>
              { showPlaying && <i onClick={() => onPlay() } className="menu-icon material-icons">play_arrow</i> }
            </div>
            <div className='menu-item'>
              { showReplay &&  <i onClick={() => onReplay() } className="menu-icon material-icons">replay</i>}
            </div>
            <div className='menu-item'>
              <input value={speed * 100} onChange={e => onSpeedScroll((e.target.value)/100) } type="range" className='speed-slider' />
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