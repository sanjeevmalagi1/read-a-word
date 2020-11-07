import React, { Fragment } from "react";

import StateWordPlayer from '../presentational/StateWordPlayer.jsx';

const PlayerContainer = () => {

  return (
    <Fragment>
      <nav className='navigation'>
        {/* <div className='side-menu left-menu' /> */}
        <div className='navbar-logo'>READ ASSISTANT</div>
        {/* <div className='side-menu right-menu' /> */}
      </nav>
      <StateWordPlayer />
    </Fragment> 
  )
  
}

export default PlayerContainer;
