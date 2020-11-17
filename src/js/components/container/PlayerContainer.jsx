import React, { useState, Fragment, useEffect } from "react";

import StateWordPlayer from '../presentational/StateWordPlayer.jsx';

import Modal from '../presentational/Modal.jsx';
import { Carousel, CarouselItem } from '../presentational/Carousel.jsx';

import SliderImage1 from '../../../intro-1.png';
import SliderImage2 from '../../../intro-2.png';
import SliderImage3 from '../../../intro-3.png';

const PlayerContainer = () => {
  const introSeen = localStorage.getItem('introSeen');
  const [ showModal, setShowModal ] = useState(!introSeen);
  
  useEffect(() => {
    if(!showModal && !introSeen) {
      localStorage.setItem('introSeen', true);
    }
  }, [showModal]);
  
  return (
    <Fragment>
      <nav className='navigation'>
        <div className='side-menu left-menu'>
          <a href="https://github.com/sanjeevmalagi1/read-a-word" target="_blank">
            <svg fill="white" height="32`" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
          </a>
        </div>
        <div className='navbar-logo'>READ A WORD</div>
        <div className='side-menu right-menu'>
          <i style={{ cursor: 'pointer', fontSize: 34 }} onClick={() => setShowModal(true)} className="material-icons">help</i>
        </div>
      </nav>
      <StateWordPlayer />
      <Modal
        show={showModal}
        onOverlayClick={() => setShowModal(false)}
        containerStyle={{ border: '1px solid white', background: 'black', color: 'white', padding: 15, width: 350, margin: 'auto' }}
      >
        <Fragment>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
            <div style={{ fontSize: 22 }}> Instructions </div>
            <i style={{ cursor: 'pointer' }} onClick={() => setShowModal(false)} className="material-icons">clear</i>
          </div>

          <Carousel
            autoChange
            repeat
            changeTime={2500}
          >
            <CarouselItem>
              <div style={{ margin: '15px auto' }}>
                <div>Step 1 : Copy the text you want to read.</div>
                <img style={{ display: 'block', width: 'auto', height: 300, margin: 'auto', marginTop: 15 }} src={SliderImage1} />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div style={{ margin: '15px auto' }}>
                <div>Step 2 : Paste the text into the textarea.</div>
                <img style={{ display: 'block', width: 'auto', height: 300, margin: 'auto', marginTop: 15 }} src={SliderImage2} />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div style={{ margin: '15px auto' }}>
                <div>Step 3 : Hit the play button.</div>
                <img style={{ display: 'block', width: 'auto', height: 300, margin: 'auto', marginTop: 15 }} src={SliderImage3} />
              </div>
            </CarouselItem>
          </Carousel>
  
        </Fragment>
      </Modal>
    </Fragment> 
  )
  
}

export default PlayerContainer;
