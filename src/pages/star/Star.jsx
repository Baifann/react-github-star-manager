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
import Eventbus from '@/utils/eventbus.js';

class Star extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      originTableData: [],
      userInfo: {},
      rawMdData: ''
    };

    this.onClickRefresh = this.onClickRefresh.bind(this);
    this.onClickResItem = this.onClickResItem.bind(this);
    this.onClickUntaggedStars = this.onClickUntaggedStars.bind(this);
    this.onClickAllStars = this.onClickAllStars.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.registerEventbus();
  }

  componentWillUnmount() {
    this.unRegisterEventbus();
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
        this.originTableData = StringUtils.deepCopy(this.tableData);
        console.log('handleGetStarSuccessResponse', this.originTableData);
        this.setState({
          tableData: this.tableData,
          originTableData: this.originTableData
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
    // if (data.data.length !== 30) {
    //   this.handleLoadFinish();
    // } else {
    //   console.log('加载更多');
    //   this.loadMoreStar();
    // }

    this.handleLoadFinish();
  }

  /**
   * 处理加载完毕
   */
  handleLoadFinish() {
    this.originTableData = StringUtils.deepCopy(this.tableData);
      this.setState({
        tableData: this.tableData,
        originTableData: this.originTableData
      });
      this.onRefreshEnd();
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

  /**
   * 注册跨组件通讯事件
   */
  registerEventbus() {
    this.addTagItemListener = Eventbus.addListener('onClickTagItem', (tag) => {
      this.handleClickTagItem(tag);
    });
  }

  /**
   * 处理点击了tag Item
   */
  handleClickTagItem(tagItem) {
    const showTableData = this.filterTableDataByTag(tagItem.tag);

    this.setState({
      tableData: showTableData
    });
  }

  /**
   * 解除组件注册
   */
  unRegisterEventbus() {
    Eventbus.removeListener(this.addTagItemListener);
  }

  /**
   * 过滤tableData
   */
  filterTableDataByTag(tag) {
    const tableData = this.originTableData.filter((item) => {
      return item.tags && item.tags.includes(tag);
    });

    return tableData;
  }

  /**
   * 点击显示所有数据
   */
  onClickAllStars() {
    const originTableData = this.state.originTableData;
    this.setState({
      tableData: originTableData
    });
  }

  /**
   * 点击显示无tags数据
   */
  onClickUntaggedStars() {
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
              onClickAllStars={this.onClickAllStars}
              onClickUntaggedStars={this.onClickUntaggedStars}
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
