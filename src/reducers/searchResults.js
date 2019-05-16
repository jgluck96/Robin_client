export default (state = null, action) => {
  switch (action.type) {
    case 'SEARCH_RESULTS':
      return action.payload

    default:
      return state
  }

}
