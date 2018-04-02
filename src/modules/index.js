import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import icosReducer from './icos/reducer'

export default combineReducers({
  routing: routerReducer,
  IcosReducer: icosReducer,
})