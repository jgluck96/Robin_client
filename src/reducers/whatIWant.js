
export default (state=[], action) => {
  switch (action.type) {
    case 'FETCH_WHATIWANT':
      return action.payload

    default:
      return state
  }

}
