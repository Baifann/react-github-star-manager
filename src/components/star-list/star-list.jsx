import React, { Component } from 'react';
import './star-list.css';
import StarListItem from '../star-list-item/star-list-item';

class StarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: -1
    };
    
  }

  componentDidMount() {
  }

  onClickResItem(item) {
    console.log('onClickItem', item);
    this.props.onClickResItem(item);

    this.setState({
      currentId: item.id
    });
  }

  render() {
    const tableData = this.props.tableData;

    return (
      <div className="star-list-container">
        {tableData.map((item, index) =>
          <div key={index} className={`star-item transition-bg ${this.state.currentId === item.id?`choose-active`:``}`}>
          <StarListItem
             item={item} onClickResItem={this.onClickResItem.bind(this, item)}/>
          </div>
        )}
      </div>
    );
  }
}

export default StarList;
