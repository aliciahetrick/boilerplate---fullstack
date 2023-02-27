import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware } from 'redux'
// import yourReducer from './yourReducer'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const store = configureStore(
  {
    reducer: {},
  },
  applyMiddleware(thunkMiddleware, createLogger())
)

export default store
