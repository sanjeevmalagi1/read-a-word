import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const CarouselItem = props => {
  return props.children;
};



const carouselDotStyle = {
  height: 7,
  width: 7,
  outline: '1px solid white',
  margin: 'auto 10px',
  padding: 3
};

const carouselDotActiveStyle = {
  background: 'white',
};
export const CarouselDot = props => {
  return <div style={{ ...carouselDotStyle, ...(props.active ? carouselDotActiveStyle : null) }}  onClick={props.onClick} />
};


export const Carousel = (props) => {
  const { children, autoChange, changeTime, repeat } = props;
  const carouselItems = children.filter(child => child.type == CarouselItem);
  
  const [ activeItemIndex, setActiveItemIndex ] = useState(0);

  const carouselDots = carouselItems.map((__, index) => <CarouselDot key={index} active={activeItemIndex == index} onClick={() => setActiveItemIndex(index)} />);

  useEffect(() => {
    if (!autoChange) {
      return;
    }

    const interval = setInterval(() => {
      if (!repeat && activeItemIndex + 1 == carouselItems.length) {
        return clearInterval(interval);
      }

      if (repeat && activeItemIndex + 1 == carouselItems.length) {
        setActiveItemIndex(0);
        return;
      }

      setActiveItemIndex(activeItemIndex => activeItemIndex + 1);
    }, changeTime);

    return () => clearInterval(interval);
  }, [activeItemIndex])  

  return (
    <div>
      { carouselItems[activeItemIndex] }
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
        {carouselDots}
      </div>
    </div>
  );
}

Carousel.defaultProps = {
  children: [],
  autoChange: false,
  repeat: false,
  changeTime: 2000,
};

Carousel.propTypes = {
  autoChange: PropTypes.bool,
  changeTime: PropTypes.number,
  repeat: PropTypes.bool,
  children: PropTypes.object,
};
