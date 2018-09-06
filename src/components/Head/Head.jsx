import React, { Component } from 'react';
import './Head.css';
import { Menu, Dropdown, Icon } from 'antd';
import Logo from '../../assets/img/logo.svg';

class Head extends Component {
  constructor(props) {
    super(props);
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

  render() {
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
    return (
      <div className="head">
        <img className="img-logo" src={Logo} alt="logo" />
        {headContainer}
      </div>
    );
  }
}

export default Head;
