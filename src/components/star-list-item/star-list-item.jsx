import React, { Component } from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';
import './star-list-item.scss';
/* eslint-disable */
import Star from '-!svg-react-loader!../../assets/img/star.svg';
import Watch from '-!svg-react-loader!../../assets/img/watch.svg';
import Api from '../../utils/api';
/* eslint-enable */

class StarListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: ''
    };
  }

  componentDidMount() {
    this.initTagsInLanguage();
  }

  onClickResItem(item) {
    console.log('onClickItem', item);
    this.props.onClickResItem(item);
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = (e) => {
    e.stopPropagation();
    // 阻止默认事件
    this.setState({ inputVisible: true }, () => this.input.focus());

    return true;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  /**
   * 还原输入
   */
  resetInput = () => {

  };

  /**
   * 点击输入框确认
   */
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ''
    });
    this.addRepoTags2Web(tags);
  };

  /**
   * 返回ref
   */
  saveInputRef = input => (this.input = input);

  /**
   * 将项目语言插入到tags中
   */
  initTagsInLanguage() {
    const language = this.props.item.language;
    if (language) {
      let tags = [];
      tags = [language, ...this.props.item.tags];
      this.setState({
        tags
      });
    }
  }

  /**
   * 向服务器请求添加
   */
  addRepoTags2Web(tags) {
    const desTags = this.getFilterTags(tags);
    if (desTags.length >= 2) {
      Api.updateRepoTags({
        id: this.props.item.id,
        tags: desTags
      }).then(res => {
        console.log(res);
      });
    } else {
      Api.addRepoTags({
        id: this.props.item.id,
        tags: desTags
      }).then(res => {
        console.log(res);
      });
    }
  }

  /**
   * 去除已第一个tags
   */
  getFilterTags(tags) {
    console.log('getFilterTags', tags);
    const desTags = [];
    tags.map((tag, index) => {
      if (index !== 0) {
        desTags.push(tag);
      }
    });
    return desTags;
  }

  /**
   * 获取tag容器
   */
  getTagContainer = () => {
    const { tags, inputVisible, inputValue } = this.state;
    return (<div className="tag-container-son">
      {tags.map((tag, index) => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable={index !== 0}
            afterClose={() => this.handleClose(tag)}
            className="title-language"
          >
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={this.saveInputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={this.handleInputChange}
          onBlur={this.resetInput}
          onPressEnter={this.handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          onClick={this.showInput}
          style={{ background: '#fff', borderStyle: 'dashed' }}
        >
          <Icon type="plus" /> New Tag
        </Tag>
      )}
    </div>);
  };
  

  render() {
    const tagContainer = this.getTagContainer();

    return (
      <div
        className="star-list-item-container"
        onClick={this.onClickResItem.bind(this, this.props.item)}
      >
        <h3 className="title-repo">{this.props.item.full_name}</h3>
        <p className="title-description">{this.props.item.description}</p>
        <div className="tag-container">
          {tagContainer}
        </div>

        <div className="bottom-container">
          <div className="title-star">
            <Star className="icon-star" />
            <span className="title-info">
              {this.props.item.stargazers_count}
            </span>
          </div>
          <div className="title-watch">
            <Watch className="icon-watch" />
            <span className="title-info">{this.props.item.forks_count}</span>
          </div>
          <a href={this.props.item.svn_url} className="title-href">
            View On Github
          </a>
        </div>
      </div>
    );
  }
}

export default StarListItem;
