import React, { Component } from 'react';
import './tag-item.scss';
/* eslint-disable */
// 主要是这里
import TagIcon from '-!svg-react-loader!../../assets/img/tag.svg';
/* eslint-enable */
import { Popover, Input, Button, Form } from 'antd';
import EditTag from '../edit-tag/edit-tag';
import Api from '../../utils/api';

class TagItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowEdit: true,
      editTagContainer: {
        display: 'flex',
        flexDirection: 'column'
      },
      isVisible: false
    };
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleSaveSuccess = this.handleSaveSuccess.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  componentDidMount() {}

  onKeyEnter() {}

  handleVisibleChange(isVisible) {
    console.log('handleVisibleChange', isVisible);
    this.setState({
      isVisible
    });
  }

  handleClickSave() {
    this.setState({
      isVisible: false
    });
  }

  handleSaveSuccess(name, id) {
    console.log(name, id);
    this.props.onSaveTagSuccess(name, id);
  }

  /**
   * 点击删除
   */
  onClickDelete() {
    Api.deleteTag({
      id: this.props.item._id
    }).then(() => {
      this.handleDeleteSuccessResponse(this.props.item._id);
    });
  }

  /**
   * 处理删除成功
   */
  handleDeleteSuccessResponse(id) {
    this.props.onDeleteSuccess(id);
  }

  render() {
    let controllerContainer = null;
    if (!this.state.isShowEdit) {
      controllerContainer = (
        <button className="btn-tag">
          <span className="tag">{this.props.item.starsCount}</span>
        </button>
      );
    } else {
      controllerContainer = (
        <Popover
          placement="bottomRight"
          visible={this.state.isVisible}
          onVisibleChange={this.handleVisibleChange}
          content={
            <div className="edit-container" style={this.state.editTagContainer}>
              <EditTag
                item={this.props.item}
                onClickSave={this.handleClickSave}
                onSaveSuccess={this.handleSaveSuccess}
              />
              <Button onClick={this.onClickDelete} className="btn-delete">Delete</Button>
            </div>
          }
          trigger="click"
        >
          <button className="btn-pop-over">...</button>
        </Popover>
      );
    }
    return (
      <li className="tag-item-container text-gray cursor-pointer">
        <TagIcon className="tag-icon" />
        <span className="title-tag">{this.props.item.tag}</span>
        {controllerContainer}
      </li>
    );
  }
}

export default TagItem;
