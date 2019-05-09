import { combineReducers } from 'redux';
import items from './addItem'
import showItem from './showItem'
import user from './userReducer'
import requestModal from './modalReducer'
import loginModal from './loginModal'
import signupModal from './signupModal'
import reviewModal from './reviewModal'
import requests from './requestReducer'
import whatIWant from './whatIWant'
import expiringRentals from './expiringRentals'
import myRentals from './myRentals'
import userGeo from './userGeo'
import showItemOwner from './showItemOwner'
import showItemOwnerItems from './showItemOwnersItems'
import falseNotifs from './falseNotifs'



export default combineReducers({
  items,
  showItem,
  user,
  requestModal,
  requests,
  whatIWant,
  loginModal,
  signupModal,
  reviewModal,
  expiringRentals,
  showItemOwnerItems,
  myRentals,
  userGeo,
  showItemOwner,
  falseNotifs
})
