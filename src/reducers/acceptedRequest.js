export default (state=[], action) => {
  switch (action.type) {
    case 'ACCEPTED_REQUESTS':
      return action.payload


    default:
      return state
  }

}
