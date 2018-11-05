import React, { Component } from 'react'
import './App.css'
import './reset.css'
import 'antd/dist/antd.css'
import Auth from './pages/auth'
import Star from './pages/star/star'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import DevTools from './store/devtool'
import { Provider } from 'react-redux'


class App extends Component {
  constructor(props) {
    super(props)

    this.onClickAuth = this.onClickAuth.bind(this)
  }

  onClickAuth() {}

  /**
   * 渲染开发者
   */
  renderDevTools() {
    if (process.env.NODE_ENV === 'production') {
      return null;
    }
    return (<DevTools />)
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div className="App">
          <BrowserRouter basename="/">
            <div>
              <Route exact path="/" component={Auth} />
              <Route path="/auth" component={Auth} />
              <Route path="/star" component={Star} />
              { this.renderDevTools() }
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    )
  }
}

export default App
