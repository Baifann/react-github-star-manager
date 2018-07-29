import React, { Component } from 'react'
import './Star.css'
import globalData from '../../utils/globalData'
import StringUtils from '../../utils/stringUtils'
import { List, Avatar } from 'antd'
import Api from '../../utils/api'

class Star extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [
        {
          title: 'Ant Design Title 1'
        },
        {
          title: 'Ant Design Title 2'
        },
        {
          title: 'Ant Design Title 3'
        },
        {
          title: 'Ant Design Title 4'
        }
      ]
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  getUserInfo() {
    
    Api.getAuthenticatedUser(globalData.token).then((data) => {
      console.log(data)
    }) 
  }



  render() {
    return (
      <div className="Star">
        <List
          itemLayout="horizontal"
          dataSource={this.state.tableData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta title={item.title} />
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default Star
