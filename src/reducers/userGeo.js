export default (state = null, action) => {
  switch (action.type) {
    case 'USER_GEO':
      return action.payload

    default:
      return state
  }

}
