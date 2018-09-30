import React, { Component } from 'react';
import './star.scss';
import globalData from '../../utils/globalData';
import StringUtils from '../../utils/stringUtils';
import { List, Avatar, Row, Col } from 'antd';
import Api from '../../utils/api';
import Head from '../../components/Head/Head';
import ResInfo from '../../components/resInfo/resInfo';
import ControlList from '../../components/control/control-list';
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

  /**
   * 获取完用户信息
   */
  handleGetUserInfoSuccessResponse(res) {
    globalData.setUserInfo(res.data);
    this.setState({
      userInfo: res.data
    });
    this.getStarFromWeb();
    this.refs.controlList.getTagsFromWeb();
  }

  /**
   * 获取收藏的项目
   */
  getStarFromWeb() {
    this.onRefreshStart();

    this.refreshStar();
  }

  /**
   * 获取完
   */
  handleGetStarSuccessResponse(data) {
    console.log(data);
    if (!data.data || data.data.length === 0) {
      if (this.tableData && this.tableData.length >= 0) {
        this.setState({
          tableData: this.tableData
        });
      }
      this.onRefreshEnd();
      return;
    }

    if (this.page === 1) {
      this.tableData = data.data;
    } else {
      this.tableData = [...this.tableData, ...data.data];
    }
    console.log(data.data.length);
    if (data.data.length !== 30) {
      this.setState({
        tableData: this.tableData
      });
      this.onRefreshEnd();
    } else {
      console.log('加载更多');
      this.loadMoreStar();
    }
  }

  /**
   * 获取数据
   */
  refreshStar() {
    this.page = 1;
    Api.starred(this.page).then(data => {
      this.handleGetStarSuccessResponse(data);
    });
  }

  /**
   * 加载更多
   */
  loadMoreStar() {
    this.page++;
    Api.starred(this.page).then(data => {
      this.handleGetStarSuccessResponse(data);
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

  onClickRefresh() {
    this.getStarFromWeb();
  }

  /**
   * 刷新
   */
  onRefreshStart() {
    console.log(this.refs.controlList);
    this.refs.controlList.onRefreshStart();
    this.refs.head.onRefreshStart();
  }

  /**
   * 刷新结束回调
   */
  onRefreshEnd() {
    this.refs.controlList.onRefreshEnd();
    this.refs.head.onRefreshEnd();
  }

  /**
   * 根据tag搜索数据
   */
  filterListByTag(tag) {
    if (!this.tableData || this.tableData.length === 0) {
      return;
    }
    const filterTableData = this.tableData.filter(item => {
      return this.isIncludeInTags(item.tags, tag);
    });

    this.setState({
      tableData: filterTableData
    });
  }

  /**
   * 标签数组当中是否包含
   */
  isIncludeInTags(tags, tag) {
    if (!tags) {
      return false;
    }

    return tags.includes(tag);
  }

  render() {
    return (
      <div className="star">
        <Head
          ref="head"
          head={this.state.userInfo.avatar_url}
          userName={this.state.userInfo.login}
        />
        <Row className="content-container">
          <Col span={3} className="control-list-container bg-blue-darkest">
            <ControlList
              ref="controlList"
              onClickRefresh={this.onClickRefresh}
            />
          </Col>
          <Col span={5} className="star-list-container">
            <StarList
              tableData={this.state.tableData}
              onClickResItem={this.onClickResItem.bind(this)}
            />
          </Col>
          <Col span={16}>
            <div className="md-container">
              <ResInfo resSrc={this.state.rawMdData} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Star;
