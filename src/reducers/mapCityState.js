
export default (state = null, action) => {
  switch (action.type) {
    case 'MAP_CITY_STATE':
      return action.payload

    default:
      return state
  }

}
