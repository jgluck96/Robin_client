import { combineReducers } from 'redux';
import items from './addItem'
import showItem from './showItem'

export default combineReducers({
  items,
  showItem
})
