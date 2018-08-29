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
      btnRefreshClass: 'btn-refresh'
    };


    this.onClickRefresh = this.onClickRefresh.bind(this);
  }

  componentDidMount() {
  }

  /**
   * 点击刷新回调
   */
  onClickRefresh() {
    console.log('refresh')

    if (typeof this.props.onClickRefresh === 'function') {
      this.props.onClickRefresh();
    }
  }

  /**
   * 刷新
   */
  onRefreshStart() {
    console.log('start-filter', 'refresh start');
    this.setState({
      btnRefreshClass: 'btn-refresh loading'
    });
  }

  /**
   * 刷新结束回调
   */
  onRefreshEnd() {
    console.log('start-filter', 'refresh end');
    this.setState({
      btnRefreshClass: 'btn-refresh'
    });
  }

  render() {
    return (
      <div className="star-filter">
        <div className="title-container">
          <h3 className="title-gray-dark">STARS</h3>
          <button className={this.state.btnRefreshClass} onClick={this.onClickRefresh}>
            <Refresh className="icon-refresh text-grey"/>
          </button>
        </div>
      </div>
    );
  }
}

export default StarFilter;
