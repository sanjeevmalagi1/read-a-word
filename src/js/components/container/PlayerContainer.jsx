import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";

import StateWordPlayer from '../presentational/StateWordPlayer.jsx';

const PlayerContainer = () => {

  const [step, setStep] = useState("paste");
  const [text, setText] = useState("The Sample Text is here");

  const handlePaste = async() => {
    const text = await navigator.clipboard.readText();
    setText(text);
    setStep('reader');
  };
  
  const page = () => {
    switch(step) {
      case 'paste': {
        
        return (
          <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Read Assistant</title>
            </Helmet>
            <div className='paste-screen'>
              <div className='paste-screen-content'>
                <div>Use text from your clipboard</div>
                <button className='paste-button' onClick={ () => handlePaste() }>
                  <i className="material-icons">assignment</i>
                </button>
              </div>
            </div>
          </Fragment>
        );
      }
      case 'reader': {

        return (
          <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Read Assistant - Reader</title>
            </Helmet>
            <StateWordPlayer
              sentence={text}
            />
          </Fragment>
        );
      }
    }
  }

  return (
    <Fragment>
      <nav className='navigation'>
        <div className='side-menu left-menu'>
          <button data-screen={step} className='navbar-back' onClick={() => setStep("paste") }>
            <i className="material-icons">navigate_before</i>
          </button>
        </div>
        <div className='navbar-logo'>READ ASSISTANT</div>
        <div className='side-menu right-menu' />
      </nav>
      { page() }
    </Fragment> 
  )
  
}

export default PlayerContainer;
