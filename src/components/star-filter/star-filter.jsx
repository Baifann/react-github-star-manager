import React, { Component } from 'react';
import './star-filter.css';
import Api from '../../utils/api';
 /* eslint-disable */
import Refresh from '-!svg-react-loader!../../assets/img/refresh.svg';
/* eslint-enable */

class StarFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };


    this.onClickRefresh = this.onClickRefresh.bind(this);
  }

  componentDidMount() {
  }

  onClickRefresh() {
    console.log('refresh')

    if (typeof this.props.onClickRefresh === 'function') {
      this.props.onClickRefresh();
    }
  }

  render() {
    return (
      <div className="star-filter">
        <div className="title-container">
          <h3 className="title-gray-dark">STARS</h3>
          <button onClick={this.onClickRefresh}>
            <Refresh className="icon-refresh text-grey"/>
          </button>
        </div>
      </div>
    );
  }
}

export default StarFilter;
