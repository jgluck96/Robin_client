export default (state = [], action) => {
  switch (action.type) {
    case 'MY_RENTALS':
      return action.payload

    default:
      return state
  }

}
