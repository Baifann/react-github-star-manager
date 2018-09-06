import React, { Component } from 'react'
import './App.css'
import './reset.css'
import 'antd/dist/antd.css'
import Auth from './pages/Auth'
import Star from './pages/star/Star'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
class App extends Component {
  constructor(props) {
    super(props)

    this.onClickAuth = this.onClickAuth.bind(this)
  }

  onClickAuth() {}

  render() {
    return (
      <div className="App">
        <BrowserRouter basename="/">
          <div>
            <Route exact path="/" component={Auth} />
            <Route path="/auth" component={Auth} />
            <Route path="/star" component={Star} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
