import React, { Component } from 'react';
import './star-list-item.css';
 /* eslint-disable */
 import Star from '-!svg-react-loader!../../assets/img/star.svg';
 import Watch from '-!svg-react-loader!../../assets/img/watch.svg';
 /* eslint-enable */


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
        <div className="tag-container">
        {
          this.props.item.language && 
          <div className="title-language">{this.props.item.language}</div>
        }        
        </div>

        <div className="bottom-container">
          <div className="title-star"><Star className="icon-star"/><span className="title-info">{this.props.item.stargazers_count}</span></div>
          <div className="title-watch"><Watch className="icon-watch"/><span className="title-info">{this.props.item.forks_count}</span></div>
          <a href={this.props.item.svn_url} className="title-href">View On Github</a>
        </div>
      </div>
    );
  }
}

export default StarListItem;
