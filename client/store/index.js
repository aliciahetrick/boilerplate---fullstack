import { configureStore, applyMiddleware } from 'redux'
import yourReducer from './yourReducer'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const store = createStconfigureStoreore(
  yourReducer,
  applyMiddleware(thunkMiddleware, createLogger())
)

export default store
