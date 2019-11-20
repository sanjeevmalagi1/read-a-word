import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class WordPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      speed: 0.2,
    };
  }

  componentDidMount() {
    const {
      sentence
    } = this.props;
    const {
      speed
    } = this.state;
    this.startSequence(sentence, speed);
  }

  startSequence = (sentence, speed) => {
    const words = sentence.split(" ");
    let offset = 0;
    words.forEach((word, index) => {
      setTimeout(() => {
        this.displayWord(word, index);
      }, (speed * 1000 ) + offset);
      offset += speed * 1000;
    })
  }

  displayWord = (word, index) => {
    this.setState(prevState => ({
      ...prevState,
      word,
      index,
      completed: index * this.state.speed,
    }));
  }

  toSentence = function(arr){ return arr.join(" ").replace(/,\s([^,]+)$/, ' and $1');};

  displaySentence = (words, wordIndex) => {
    const sentenceWitHeighLight = words.map((word, index) => {
      if(wordIndex == index) {
        return `<span class='heighlight'>${word} </span>`;
      }
      return `${word} `;
    })
    const sentence = this.toSentence(sentenceWitHeighLight);
    return <p dangerouslySetInnerHTML={ { __html: sentence } } />
  }
  
  render() {
    const {
      word,
      speed,
      index,
    } = this.state;

    const {
      sentence
    } = this.props;

    if(!sentence) {
      return null;
    }
  
    const words = sentence.split(" ");
    const totalTimeRequired = (words.length - 1) * speed;
    const newSentence = sentence.replace(word, `<span class='heighlight'>${word}</span>`)
    return (
      <Fragment>
        <svg width="100%" height="500">
          <text id='main-word' x="50%" y="50%" textAnchor="middle" fontSize='100'>{word}</text>
        </svg>
        { this.displaySentence(words, index) }
        <button onClick={ () =>  this.startSequence(sentence, speed)}>Restart</button>
      </Fragment>
    );
  }
}


WordPlayer.propTypes = {
  sentence: PropTypes.string.isRequired
};

export default WordPlayer;
