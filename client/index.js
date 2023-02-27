import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/index'
import '../public/index.css'

ReactDOM.render(
  <Provider store={store}>
    <div className="pink">Hello World!</div>
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
)
