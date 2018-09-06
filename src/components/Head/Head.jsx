import React, { Component } from 'react';
import './Head.css';
import { Menu, Dropdown, Icon } from 'antd';
import Logo from '../../assets/img/logo.svg';
import Refresh from '../../assets/img/status-spinner.svg';

class Head extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgClassName: "",
      isLoading: false
    }
  }

  componentDidMount() {}

  getMenu() {
    return (
      <Menu>
        <Menu.Item key="0">
          <span>Settings</span>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">GitHub</a>
        </Menu.Item>
        <Menu.Item key="3">
          <span className="">Logout</span>
        </Menu.Item>
      </Menu>
    );
  }

  /**
   * 开始刷新数据
   */
  onRefreshStart() {
    this.setState({
      imgClassName: 'loading',
      isLoading: true
    });
  }

  /**
   * 开始结束刷新
   */
  onRefreshEnd() {
    this.setState({
      imgClassName: '',
      isLoading: false
    });
  }

  /**
   * 获取头部信息 根据状态显示或隐藏数据
   */
  getHeadContianer () {
    let headContainer = null;
    if (this.props.head) {
      headContainer = (
        <div className="head-container">
          <img className="img-head" src={this.props.head} alt="head" />
          <Dropdown
            className="drop-down-menu"
            overlay={this.getMenu()}
            trigger={['click']}
          >
            <span className="title-user-name">
              {this.props.userName}
              <Icon type="down" />
            </span>
          </Dropdown>
        </div>
      );
    } else {
      headContainer = '';
    }
    return headContainer;
  }

  /**
   * 获取加载容器 根据状态隐藏或显示container
   */
  getLoadingContainer() {
    let loadingContainer = null;
    if (this.state.isLoading) {
      loadingContainer = (
        <div className="fetch-container">
          <span className="title-fetch">Refreshing stars...</span>
          <img className={`img-refresh ${this.state.imgClassName}`} src={Refresh} alt="fetch" width="16" height="16"/>
        </div>
      );
    } else {
      loadingContainer = null
    }
    return loadingContainer;
  }

  render() {
    const headContainer = this.getHeadContianer();
    const loadingContainer = this.getLoadingContainer();

    return (
      <div className="head">
        <img className="img-logo" src={Logo} alt="logo" />
        {loadingContainer}
        {headContainer}
      </div>
    );
  }
}

export default Head;
