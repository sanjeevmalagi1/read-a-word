import React, { Fragment } from "react";
import PropTypes from "prop-types";

const defaultOverlayStyle = {
  zIndex: 100,
  position: 'fixed',
  background: 'rgba(0, 0, 0, 0.7)',
  width: '100%',
  height: '100%',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const defaultContainerStyle = {
  zIndex: 101,
  minWidth: 300,
  minHeight: 300,
  maxWidth: '100%',
  maxHeight: '100%',
  background: 'white',
  color: 'black',
  position: 'relative'
};

const Modal = (props) => {
  const {
    show,
    overlayStyle,
    containerStyle,
    onOverlayClick,
    children,
  } = props;

  if (!show) {
    return null;
  }

  return (
    <div>
      <div style={{ ...defaultContainerStyle, ...containerStyle }}>
        {children}
      </div>
      <div onClick={onOverlayClick} style={{ ...defaultOverlayStyle, ...overlayStyle }} />
    </div>
  );
}

Modal.defaultProps = {
  show: false,
  overlayStyle: {},
  containerStyle: {},
  children: null,
  onOverlayClick: () => {}
};

Modal.propTypes = {
  children: PropTypes.object,
  show: PropTypes.bool,
  containerStyle: PropTypes.object,
  overlayStyle: PropTypes.object,
  onOverlayClick: PropTypes.func,
};

export default Modal;