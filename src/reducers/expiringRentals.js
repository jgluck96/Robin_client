export default (state = null, action) => {
  switch (action.type) {
    case 'EXPIRING_RENTALS':
      return action.payload

    default:
      return state
  }
}
