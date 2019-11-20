import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import Input from "../presentational/Input.jsx";

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seo_title: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  render() {
    const { seo_title } = this.state;
    return (
      <Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Reading Assistant</title>
        </Helmet>
        <form id="article-form" onSubmit={ e => this.handleSubmit(e) } >
          <Input
            text="SEO title"
            label="seo_title"
            type="text"
            id="seo_title"
            value={seo_title}
            handleChange={this.handleChange}
          />
        </form>
      </Fragment>
    );
  }
}

export default FormContainer;
