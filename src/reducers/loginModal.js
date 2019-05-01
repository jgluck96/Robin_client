export default (state = false, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN_MODAL':
      return action.payload
    case 'CLOSE_LOGIN_MODAL':
      return action.payload

    default:
      return state
  }

}
