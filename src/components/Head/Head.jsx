import React, { Component } from 'react';
import './Head.css';
import globalData from '../../utils/globalData';
import StringUtils from '../../utils/stringUtils';
import { Menu, Dropdown, Icon } from 'antd';

class Head extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  getMenu() {
    return (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <div className="head">
        <div className="head-container">
          <img className="img-head" src={this.props.head} alt="head" />
          <Dropdown className="drop-down-menu" overlay={this.getMenu()} trigger={['click']}>
            <span className="title-user-name">{this.props.userName}</span>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default Head;
