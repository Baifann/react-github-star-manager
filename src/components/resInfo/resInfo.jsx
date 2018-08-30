import React, { Component } from 'react';
import './resInfo.css';
import 'github-markdown-css/github-markdown.css';
import NoSelectedImg from '../../assets/img/not-selected.svg';

class ResInfo extends Component {
  constructor(props) {
    super(props);
  }

  createMarkup() {
    return { __html: this.props.resSrc };
  }

  render() {
    if (this.props.resSrc) {
      return (
        <div
          className="res-info-container markdown-body"
          dangerouslySetInnerHTML={this.createMarkup()}
        />
      );
    } else {
      return (
        <div className="resinfo-container-no-selected">
          <div className="no-selected-container">
            <img
              alt="no-selected"
              src={NoSelectedImg}
              className="img-no-selected"
            />
            <span className="title-no-selected">No Repo Selected</span>
          </div>
        </div>
      );
    }
  }
}

export default ResInfo;
