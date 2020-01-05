
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
    scrollFollow,
    onPlay,
    onReplay,
    onPause,
    onScroll,
    onSpeedScroll,
    onScrollFollow,
  } = props;

  const displayPercentage = completedPercentage.toFixed(4);
  return (
    <div id="player" className="player">
      {children}
      <div className="bottom-menu">
        <input value={displayPercentage} onChange={e => onScroll(parseFloat(e.target.value)) } type="range" min="0" max="100" className="slider">
        </input>
        <div className='filler' style={{ width: `${displayPercentage}%` }}></div>
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
            <input value={speed * 100} onChange={e => onSpeedScroll((e.target.value)/100) } type="range" className='speed-slider'>
            </input>
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