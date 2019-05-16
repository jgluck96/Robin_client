export default (state = null, action) => {
  switch (action.type) {
    case 'SEARCH_LOCATION':
      return action.payload

    default:
      return state
  }

}
