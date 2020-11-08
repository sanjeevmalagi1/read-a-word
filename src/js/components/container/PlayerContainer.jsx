import React, { Fragment } from "react";

import StateWordPlayer from '../presentational/StateWordPlayer.jsx';

const PlayerContainer = () => {

  return (
    <Fragment>
      <nav className='navigation'>
        <div className='navbar-logo'>READ ASSISTANT</div>
      </nav>
      <StateWordPlayer />
    </Fragment> 
  )
  
}

export default PlayerContainer;
