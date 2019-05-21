
export default (state = null, action) => {
  switch (action.type) {
    case 'FETCH_MAP_ITEMS':
      return action.payload

    default:
      return state
  }
}
