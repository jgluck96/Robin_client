import { combineReducers } from 'redux';
import items from './addItem'
import showItem from './showItem'
import user from './userReducer'
import modal from './modalReducer'



export default combineReducers({
  items,
  showItem,
  user,
  modal
})
