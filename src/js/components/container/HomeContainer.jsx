import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import WordPlayer from '../presentational/WordPlayer.jsx';

class FormContainer extends Component {
  

  render() {
    return (
      <Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Reading Assistant</title>
        </Helmet>
        <WordPlayer
          sentence={`The self-study lessons in this section are written and organised according to the levels of the Common European Framework of Reference for languages (CEFR). There are different types of texts and interactive exercises that practise the reading skills you need to do well in your studies, to get ahead at work and to communicate in English in your free time.`}
        />
      </Fragment>
    );
  }
}

export default FormContainer;
