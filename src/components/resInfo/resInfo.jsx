import React, { Component } from 'react';
import './resInfo.css';
import 'github-markdown-css/github-markdown.css';

class ResInfo extends Component {
  constructor(props) {
    super(props);
  }

  createMarkup() {
    return { __html: this.props.resSrc };
  }

  render() {
    return (
      <div
        className="res-info-container"
        dangerouslySetInnerHTML={this.createMarkup()}
      />
    );
  }
}

export default ResInfo;
