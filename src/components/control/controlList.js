import React, { Component } from 'react'
import { Input } from 'antd';
import './controlList.css'

class ControlList extends Component {

  constructor(props) {
    super(props)
  }

  componentWillUpdate(nextProps) {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="control-list">
        <Input placeholder="请输入标签"></Input>
      </div>
    )
  }
}

export default ControlList
