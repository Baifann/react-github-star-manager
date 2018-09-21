import React, { Component } from 'react';
import { Input, List } from 'antd';
import './controlList.css';
import StarFilter from '../star-filter/star-filter';
import TagList from '../tag-list/tag-list';
import Api from '../../utils/api';
class ControlList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tagTableData: [],
      inputValue: ''
    };

    this.onClickRefresh = this.onClickRefresh.bind(this);
    this.handleSaveTagSuccess = this.handleSaveTagSuccess.bind(this);
    this.handleDeleteTagSuccess = this.handleDeleteTagSuccess.bind(this);
  }

  componentWillUpdate(nextProps) {}

  componentDidMount() {
    
  }

  /**
   * 处理点击回车事件
   */
  onKeyEnter(e) {
    const input = this.refs.myInput.input.value;
    this.addTag2Web(input);
    // 将输入框置空
    this.refs.myInput.input.value = '';
  }

  onClickRefresh(e) {
    console.log('onClickRefresh');

    this.props.onClickRefresh();
  }

  /**
   * 刷新
   */
  onRefreshStart() {
    console.log('onRefreshStart', 'controlList');
    this.refs.starFilter.onRefreshStart();
  }

  /**
   * 刷新结束回调
   */
  onRefreshEnd() {
    this.refs.starFilter.onRefreshEnd();
  }

  /**
   * 想服务器请求添加tag
   */
  addTag2Web(input) {
    Api.addTag({ name: input }).then(() => {
      this.getTagsFromWeb();
    });
  }

  /**
   * 从服务器获取tags数据
   */
  getTagsFromWeb() {
    Api.getTag().then(data => {
      this.handleGetTagsSuccessResponse(data.data);
    });
  }

  handleGetTagsSuccessResponse(data) {
    const tagTableData = data.data;

    this.setState({
      tagTableData
    });
  }

  /**
   * 保存tag成功
   */
  handleSaveTagSuccess(tag, id) {
    console.log(tag, id);
    const index = this.getIndexByTagId(id);
    const tableData = this.state.tagTableData;
    tableData[index].tag = tag;
    this.setState({
      tagTableData: tableData
    });
  }

  /**
   * 处理
   */
  getIndexByTagId(id) {
    const tableData = this.state.tagTableData;
    const index = tableData.findIndex(item => {
      return item._id === id;
    });
    return index;
  }

  /**
   * 删除tag成功情况
   */
  handleDeleteTagSuccess(id) {
    const tableData = this.state.tagTableData;
    const index = this.getIndexByTagId(id);
    if (index >= 0) {
      tableData.splice(index, 1);
      this.setState({
        tagTableData: tableData
      });
    }
  }

  render() {
    return (
      <div className="control-list">
        <StarFilter ref="starFilter" onClickRefresh={this.onClickRefresh} />
        <Input
          ref="myInput"
          placeholder="请输入标签"
          onPressEnter={this.onKeyEnter.bind(this)}
        />
        <TagList
          tableData={this.state.tagTableData}
          onSaveTagSuccess={this.handleSaveTagSuccess}
          onDeleteTagSuccess={this.handleDeleteTagSuccess}
        />
      </div>
    );
  }
}

export default ControlList;
