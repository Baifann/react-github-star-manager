import React, { Component } from 'react';
import './tag-item.css';
/* eslint-disable */
 // 主要是这里
 import TagIcon from '-!svg-react-loader!../../assets/img/tag.svg';
 /* eslint-enable */



class TagItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <li className="tag-item-container text-gray cursor-pointer">
        <TagIcon className="tag-icon"/>
        <span>{this.props.item.title}</span>
      </li>
    );
  }
}

export default TagItem;
