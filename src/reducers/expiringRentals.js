export default (state = [], action) => {
  switch (action.type) {
    case 'EXPIRING_RENTALS':
      return action.payload

    default:
      return state
  }
}
