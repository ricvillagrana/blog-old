import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const routing = (
  <Router>
    <Layout>
      <Route exact path="/" component={App} />
    </Layout>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.register()
