import React, { Component } from 'react';
import './tag-list.css';
import TagItem from '../tag-item/tag-item';

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleTagSaveSuccess = this.handleTagSaveSuccess.bind(this);
    this.handleTagDeleteSuccess = this.handleTagDeleteSuccess.bind(this);
  }

  componentDidMount() {}

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
  onClickItem = (item) => {
    console.log(item);
  }

  render() {
    const tableData = this.props.tableData;

    return (
      <div className="tag-list-container text-gray">
        {tableData.map((item, index) => (
          <TagItem
            item={item}
            key={index}
            click={this.onClickItem(item)}
            onSaveTagSuccess={this.handleTagSaveSuccess}
            onDeleteSuccess={this.handleTagDeleteSuccess}
          />
        ))}
      </div>
    );
  }
}

export default TagList;
