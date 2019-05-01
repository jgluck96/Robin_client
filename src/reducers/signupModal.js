export default (state = false, action) => {
  switch (action.type) {
    case 'OPEN_SIGNUP_MODAL':
      return action.payload
    case 'CLOSE_SIGNUP_MODAL':
      return action.payload

    default:
      return state
  }

}
