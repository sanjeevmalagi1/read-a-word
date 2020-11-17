import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Slider = (props) => {
  const {
    currentValue,
    minValue,
    maxValue,
    transitionSpeed,
    stepSize,
    onChange
  } = props;

  const percentageComplete  = (currentValue / maxValue) * 100;
  return (
    <div className='slider-container'>
      <input value={currentValue} onChange={e => onChange(e.target.value) } step={stepSize} type="range" min={minValue} max={maxValue} className="slider" />
      <div className='filler-container' style={{ width: '100%' }}>
        <div className='filler' style={{ width: `calc(${percentageComplete}% + 5px)`, transition: `width ${transitionSpeed}s linear 0s ` }}></div>
      </div>
    </div>
  );
}

Slider.defaultProps = {
  minValue: 0,
  maxValue: 1,
  transitionSpeed: 0,
  stepSize: 0.1,
  onChange: () => {}
};

Slider.propTypes = {
  currentValue: PropTypes.number.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  transitionSpeed: PropTypes.number,
  stepSize: PropTypes.number,
  onChange: PropTypes.function
};

export default Slider;