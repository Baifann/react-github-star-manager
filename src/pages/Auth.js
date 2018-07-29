import React, { Component } from 'react'
import './auth.css'
import { Button } from 'antd'
import globalData from '../utils/globalData'
import StringUtils from '../utils/stringUtils'
import { Redirect } from 'react-router-dom'

class Auth extends Component {

  constructor(props) {
    super(props)

    this.onClickAuth = this.onClickAuth.bind(this)
    this.hasToken = false
    
    this.state = {
      authUrl: 'https://github.com/login/oauth/authorize',
      hasToken: false
    }
  }

  componentWillUpdate(nextProps) {
    console.log('componentWillUpdate', nextProps)

    this.saveTokenByUrl(nextProps.location.search)
  }

  componentDidMount() {
    this.initAuthUrl()
    

    console.log("componentDidMount", this.hasToken)

    this.setState({
      hasToken: this.hasToken
    })
  }

  /**
   * 点击授权
   */
  onClickAuth() {
    window.location.href = this.state.authUrl
  }

  /**
   * 初始化授权地址
   */
  initAuthUrl() {
    let authUrl = this.state.authUrl
    authUrl = `${authUrl}?client_id=${globalData.CLIENT_ID}`
    authUrl = `${authUrl}&scope=${this.getAuthScop()}`
    authUrl = `${authUrl}&redirect_uri=http://localhost:3000`
    this.setState({
      authUrl
    })
  }

  /**
   * 获取授权范围
   */
  getAuthScop() {
    const scopes = [
      'user',
      'public_repo'
    ]
    const scopesStr = scopes.join(" ")
    return scopesStr
  }

  /**
   * 保存token
   */
  saveTokenByUrl(url) {
    if (StringUtils.isBlank(url)) {
      return
    }
    
    if (url.indexOf('code') >= 0) {
      const token = StringUtils.getQueryVariable('code')
      globalData.setToken(token) 
      // 跳转到 star界面
      this.hasToken = true
    } else {
      this.hasToken = false
    }

    this.setState({
      hasToken: this.hasToken
    })

    console.log("saveTokenByUrl", this.hasToken)
  }

  render() {
    console.log("render", this.state.hasToken)
    if (this.state.hasToken) {
      return (
        <Redirect to="/star" />
      )
    }
    return (
      <div className="Auth">
        <Button className="btn-auth" onClick={this.onClickAuth}>
          点击授权
        </Button>
      </div>
    )
  }
}

export default Auth
