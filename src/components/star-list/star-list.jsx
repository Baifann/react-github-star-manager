import React, { Component } from 'react';
import './star-list.css';
import StarListItem from '../star-list-item/star-list-item';

class StarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  componentDidMount() {
  }

  onClickResItem(item) {
    console.log('onClickItem', item);
    this.props.onClickResItem(item);
  }

  render() {
    const tableData = this.props.tableData;

    return (
      <div className="star-list-container">
        {tableData.map((item) =>
          <StarListItem item={item} onClickResItem={this.onClickResItem.bind(this, item)}/>
        )}
      </div>
    );
  }
}

export default StarList;
