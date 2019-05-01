import { combineReducers } from 'redux';
import items from './addItem'
import showItem from './showItem'
import user from './userReducer'
import requestModal from './modalReducer'
import loginModal from './loginModal'
import signupModal from './signupModal'
import requests from './requestReducer'
import whatIWant from './whatIWant'
import acceptedRequests from './acceptedRequest'
import deniedRequests from './deniedRequest'



export default combineReducers({
  items,
  showItem,
  user,
  requestModal,
  requests,
  whatIWant,
  loginModal,
  signupModal
})
