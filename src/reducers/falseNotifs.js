
export default (state = null, action) => {
  switch (action.type) {
    case 'FALSE_NOTIFS':
      return action.payload

    default:
      return state
  }
}
