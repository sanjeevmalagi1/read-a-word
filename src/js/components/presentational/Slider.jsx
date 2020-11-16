import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Slider = (props) => {
  const {
    currentValue,
    minValue,
    maxValue,
    transitionSpeed,
    onChange
  } = props;

  const percentageComplete  = (currentValue / maxValue) * 100;
  return (
    <div className='slider-container'>
      <input value={currentValue} onChange={e => onChange(e.target.value) } step={1} type="range" min={minValue} max={maxValue} className="slider" />
      <div className='filler-container' style={{ width: '100%' }}>
        <div className='filler' style={{ width: `calc(${percentageComplete}% + 5px)`, transition: `width ${transitionSpeed}s linear 0s ` }}></div>
      </div>
    </div>
  );
}

export default Slider;