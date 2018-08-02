import React, { Component } from 'react'
import './Star.css'
import globalData from '../../utils/globalData'
import StringUtils from '../../utils/stringUtils'
import { List, Avatar } from 'antd'
import Api from '../../utils/api'
import Head from '../../components/Head/Head'

class Star extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [],
      userInfo: {}
    }
  }

  componentDidMount() {
    this.getUserInfo();
    this.getStarFromWeb();
  }

  getUserInfo() {
    
    Api.getAuthenticatedUser().then((data) => {
      this.handleGetUserInfoSuccessResponse(data)
    }).catch(e => {
      console.log(e)
    })
  }

  handleGetUserInfoSuccessResponse(res) {
    globalData.setUserInfo(res.data)
    this.setState({
      userInfo: res.data
    });
  }

  getStarFromWeb() {
    Api.starred(1).then((data) => {
      this.handleGetStarSuccessResponse(data);
    })
  }

  handleGetStarSuccessResponse(data) {
    console.log(data);
    this.tableData = data.data;
    this.setState({
      tableData: this.tableData
    })
  }

  render() {
    return (
      <div className="Star">
        <Head head={this.state.userInfo.avatar_url} />
        <List
          itemLayout="horizontal"
          dataSource={this.state.tableData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta title={item.full_name} />
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default Star
