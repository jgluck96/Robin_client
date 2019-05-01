export default (state=[], action) => {
  switch (action.type) {
    case 'DENIED_REQUESTS':
      return action.payload


    default:
      return state
  }

}
