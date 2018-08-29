import React, { Component } from 'react';
import './star-list-item.css';

class StarListItem extends Component {
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
    return (
      <div className="star-list-item-container" onClick={this.onClickResItem.bind(this, this.props.item)}>
        <h3 className="title-repo">{this.props.item.full_name}</h3>
        <p className="title-description">{this.props.item.description}</p>
        <li className="title-language">{this.props.item.language}</li>

        <div className="bottom-container">
          <span className="title-star">{this.props.item.stargazers_count}</span>
          <span className="title-watch">{this.props.item.watchers_count}</span>
        </div>
      </div>
    );
  }
}

export default StarListItem;
