import React, { Component } from 'react'
import './App.css'
import './reset.css'
import 'antd/dist/antd.css'
import Auth from './pages/Auth.js'
import Star from './pages/star/Star'
import { BrowserRouter as Router, Route } from 'react-router-dom'
class App extends Component {
  constructor(props) {
    super(props)

    this.onClickAuth = this.onClickAuth.bind(this)
  }

  onClickAuth() {}

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Auth} />
            <Route path="/star" component={Star} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
