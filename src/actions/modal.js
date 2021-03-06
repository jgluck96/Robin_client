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

}
export const closeSignupModal = () => {
  return {
    type: 'CLOSE_SIGNUP_MODAL',
    payload: false
  }
}

export const openReviewModal = (item) => {
  return {
    type: 'OPEN_REVIEW_MODAL',
    payload: {status: true, item: item}
  }

}
export const closeReviewModal = () => {
  return {
    type: 'CLOSE_REVIEW_MODAL',
    payload: false
  }
}
