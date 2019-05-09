export default (state = false, action) => {
  switch (action.type) {
    case 'OPEN_REVIEW_MODAL':
      return action.payload
    case 'CLOSE_REVIEW_MODAL':
      return action.payload

    default:
      return state
  }

}
