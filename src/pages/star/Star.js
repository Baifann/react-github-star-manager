import React, { Component } from 'react';
import './Star.css';
import globalData from '../../utils/globalData';
import StringUtils from '../../utils/stringUtils';
import { List, Avatar, Row, Col } from 'antd';
import Api from '../../utils/api';
import Head from '../../components/Head/Head';
import ResInfo from '../../components/resInfo/resInfo';

class Star extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      userInfo: {},
      rawMdData: ""
    };

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
    Api.starred(1).then(data => {
      this.handleGetStarSuccessResponse(data);
    });
  }

  handleGetStarSuccessResponse(data) {
    console.log(data);
    this.tableData = data.data;
    this.setState({
      tableData: this.tableData
    });
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

  render() {
    return (
      <div className="Star">
        <Head head={this.state.userInfo.avatar_url} />
        <Row>
          <Col span={12}>
            <List
              itemLayout="horizontal"
              dataSource={this.state.tableData}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta title={item.full_name} onClick={this.onClickResItem.bind(this, item)} />
                </List.Item>
              )}
            />
          </Col>
          <Col span={12}>
              <ResInfo resSrc={this.state.rawMdData}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Star;
