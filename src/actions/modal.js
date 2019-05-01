export const openModal = () => {
  return {
    type: 'OPEN_MODAL',
    payload: true
  }
}
export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL',
    payload: false
  }
}

export const openLoginModal = () => {
  return {
    type: 'OPEN_LOGIN_MODAL',
    payload: true
  }
  console.log(this);
  // dispatch(closeSignupModal())

}
export const closeLoginModal = () => {
  return {
    type: 'CLOSE_LOGIN_MODAL',
    payload: false
  }
}

export const openSignupModal = () => {
  return {
    type: 'OPEN_SIGNUP_MODAL',
    payload: true
  }
  // dispatch(closeLoginModal())
}
export const closeSignupModal = () => {
  return {
    type: 'CLOSE_SIGNUP_MODAL',
    payload: false
  }
}
