import React, { Component } from 'react';
import './star-filter.scss';
import Api from '../../utils/api';
/* eslint-disable */
import Refresh from '-!svg-react-loader!../../assets/img/refresh.svg';
/* eslint-enable */
import Eventbus from '@/utils/eventbus.js';

class StarFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnRefreshClass: 'btn-refresh',
      currentFilterItemIndex: 0
    };

    this.onClickRefresh = this.onClickRefresh.bind(this);
  }

  componentDidMount() {
    this.registerEventbus();
  }

  componentWillUnmount() {
    this.unRegisterEventbus();
  }

  /**
   * 点击刷新回调
   */
  onClickRefresh() {
    console.log('refresh');

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

  /**
   * 点击过滤
   */
  onClickFilterItem(index, e) {
    e.preventDefault();
    console.log(index, this.props);
    this.setState({
      currentFilterItemIndex: index
    });

    if (index === 0) {
      this.props.onClickAllStars();
      Eventbus.emit('onClickAllStars');
    } else {
      this.props.onClickUntaggedStars();
      Eventbus.emit('onClickUntaggedStars');
    }
  }

  /**
   * 注册跨组件通讯事件
   */
  registerEventbus() {
    this.addTagItemListener = Eventbus.addListener('onClickTagItem', tag => {
      this.setState({
        currentFilterItemIndex: -1
      });
    });
  }

  /**
   * 解除组件注册
   */
  unRegisterEventbus() {
    Eventbus.removeListener(this.addTagItemListener);
  }

  render() {
    return (
      <div className="star-filter">
        <div className="title-container">
          <h3 className="title-gray-dark">STARS</h3>
          <button
            className={this.state.btnRefreshClass}
            onClick={this.onClickRefresh}
          >
            <Refresh className="icon-refresh text-grey" />
          </button>
        </div>
        <ul>
          <li
            className="filter-item"
            onClick={this.onClickFilterItem.bind(this, 0)}
          >
            <span
              className={`${
                this.state.currentFilterItemIndex === 0
                  ? 'title-filter-item-active'
                  : 'title-filter-item'
              }`}
            >
              All Stars
            </span>
          </li>
          <li
            className="filter-item"
            onClick={this.onClickFilterItem.bind(this, 1)}
          >
            <span
              className={`${
                this.state.currentFilterItemIndex === 1
                  ? 'title-filter-item-active'
                  : 'title-filter-item'
              }`}
            >
              {' '}
              Untagged Stars
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

export default StarFilter;
