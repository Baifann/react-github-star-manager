import React, { Component } from 'react';
import './tag-list.css';
import TagItem from '../tag-item/tag-item';

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const tableData = this.props.tableData;

    return (
      <div className="tag-list-container text-gray">
        {tableData.map((item, index) => 
          <TagItem item={item} key={index} />
        )}
      </div>
    );
  }
}

export default TagList;
