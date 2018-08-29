import React, { Component } from 'react';
import './Star.css';
import globalData from '../../utils/globalData';
import StringUtils from '../../utils/stringUtils';
import { List, Avatar, Row, Col } from 'antd';
import Api from '../../utils/api';
import Head from '../../components/Head/Head';
import ResInfo from '../../components/resInfo/resInfo';
import ControlList from '../../components/control/controlList';
import StarList from '../../components/star-list/star-list';

class Star extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      userInfo: {},
      rawMdData: ''
    };

    this.onClickRefresh = this.onClickRefresh.bind(this);
    this.onClickResItem = this.onClickResItem.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.getStarFromWeb();
  }

  getUserInfo() {
    Api.getAuthenticatedUser()
      .then(data => {
        this.handleGetUserInfoSuccessResponse(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleGetUserInfoSuccessResponse(res) {
    globalData.setUserInfo(res.data);
    this.setState({
      userInfo: res.data
    });
  }

  /**
   * 获取收藏的项目
   */
  getStarFromWeb() {
    this.onRefreshStart();
    
    Api.starred(1).then(data => {
      this.handleGetStarSuccessResponse(data);
    });
  }

  /**
   * 获取完
   */
  handleGetStarSuccessResponse(data) {
    console.log(data);
    this.tableData = data.data;
    this.setState({
      tableData: this.tableData
    });

    this.onRefreshEnd();
  }

  /**
   * 点击仓库
   */
  onClickResItem(item) {
    console.log('onClickItem', item);

    this.getReadmeFromWeb(item);
  }

  /**
   * 获取readme
   */
  getReadmeFromWeb(item) {
    Api.readMe({
      owner: item.owner.login,
      repo: item.name
    }).then(res => {
      console.log(res);
      const rawMdData = res.data;
      this.setState({
        rawMdData
      });
    });
  }

  onClickRefresh() {
    this.getStarFromWeb();
  }

    /**
   * 刷新
   */
  onRefreshStart() {
    console.log(this.refs.controlList);
    this.refs.controlList.onRefreshStart();
  }
  
  /**
   * 刷新结束回调
   */
  onRefreshEnd() {
    this.refs.controlList.onRefreshEnd();
  }

  render() {
    return (
      <div className="star">
        <Head head={this.state.userInfo.avatar_url} />{' '}
        <Row className="content-container">
          <Col span={4} className="control-list-container bg-blue-darkest">
            <ControlList ref="controlList" onClickRefresh={this.onClickRefresh}/>
          </Col>{' '}
          <Col span={4} className="star-list-container">
            <StarList tableData={this.state.tableData}
              onClickResItem={this.onClickResItem.bind(this)}/>
          </Col>{' '}
          <Col span={16}>
            <div className="md-container">
              <ResInfo resSrc={this.state.rawMdData} />{' '}
            </div>{' '}
          </Col>{' '}
        </Row>{' '}
      </div>
    );
  }
}

export default Star;