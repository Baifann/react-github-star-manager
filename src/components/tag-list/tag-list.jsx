import React, { Component } from 'react';
import './tag-list.css';
import TagItem from '../tag-item/tag-item';
import Eventbus from '@/utils/eventbus.js';

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTagIndex: -1
    };

    this.handleTagSaveSuccess = this.handleTagSaveSuccess.bind(this);
    this.handleTagDeleteSuccess = this.handleTagDeleteSuccess.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }

  componentDidMount() {
    this.registerEventbus();
  }

  componentWillUnmount() {
    this.unRegisterEventbus();
  }

  /**
   * 处理标签保存成功
   */
  handleTagSaveSuccess(tag, id) {
    this.props.onSaveTagSuccess(tag, id);
  }

  handleTagDeleteSuccess(id) {
    this.props.onDeleteTagSuccess(id);
  }

  /**
   * 点击某一项
   */
  onClickItem(item, tagIndex) {
    console.log(item);
    this.setState({
      currentTagIndex: tagIndex
    })
    Eventbus.emit('onClickTagItem', item, tagIndex);
  }

   /**
   * 注册跨组件通讯事件
   */
  registerEventbus() {
    this.addClickAllStarsListener = Eventbus.addListener('onClickAllStars', () => {
      this.setState({
        currentTagIndex: -1
      })
    });
    
    this.addClickUntaggedStarsListener = Eventbus.addListener('onClickUntaggedStars', () => {
      this.setState({
        currentTagIndex: -1
      })
    });
  }

  /**
   * 解除组件注册
   */
  unRegisterEventbus() {
    Eventbus.removeListener(this.addClickAllStarsListener);
    Eventbus.removeListener(this.addClickUntaggedStarsListener);
  }

  render() {
    const tableData = this.props.tableData;

    return (
      <div className="tag-list-container text-gray">
        {tableData.map((item, index) => (
          <TagItem
            item={item}
            key={index}
            dataIndex={index}
            onClickItem={this.onClickItem}
            onSaveTagSuccess={this.handleTagSaveSuccess}
            onDeleteSuccess={this.handleTagDeleteSuccess}
            isActive={this.state.currentTagIndex === index}
          />
        ))}
      </div>
    );
  }
}

export default TagList;
