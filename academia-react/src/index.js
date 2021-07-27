import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MainRouter from './router'
import './App.css'
import configureStore from './redux/store'

const initialState = {}
const store = configureStore(initialState)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
