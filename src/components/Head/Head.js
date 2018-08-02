import React, { Component } from 'react'
import './Head.css'
import globalData from '../../utils/globalData'
import StringUtils from '../../utils/stringUtils'

class Head extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }


  render() {
    return (
      <div className="head">
        <img className="img-head" src={this.props.head} alt="head"/>
      </div>
    )
  }
}

export default Head;
