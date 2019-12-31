
import React from "react";
import PropTypes from "prop-types";

const Player = (props) => {
  const {
    children,
    speed,
    completedPercentage,
    showPlaying,
    showPaused,
    showReplay,
    onPlay,
    onReplay,
    onPause,
    onScroll,
    onSpeedScroll,
  } = props;
  return (
    <div id="player" className="player">
      {children}
      <div id="player-layover" className="player-layover">
        <div className="hover-menu">
          <input value={completedPercentage} onChange={e => onScroll(parseFloat(e.target.value)) } type="range" min="0" max="100" className="slider">
          </input>
          <div className='filler' style={{ width: `${completedPercentage}%` }}></div>
          <div className="controls">
            <div className="menu-left">
              { showPaused && <i onClick={() => onPause() } className="menu-icon material-icons">pause</i> }
              { showPlaying && <i onClick={() => onPlay() } className="menu-icon material-icons">play_arrow</i> }
              { showReplay &&  <i onClick={() => onReplay() } className="menu-icon material-icons">replay</i>}
              <input value={speed * 100} onChange={e => onSpeedScroll((e.target.value)/100) } type="range">
              </input>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

Player.propTypes = {
  children: PropTypes.object.isRequired,
  speed: PropTypes.number.isRequired,
  completedPercentage: PropTypes.number.isRequired,
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