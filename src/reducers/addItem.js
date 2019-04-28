export default (state = [], action) => {
  let idx;
  switch (action.type) {
    case 'FETCH_ITEMS':
      return action.payload

    default:
      return state
  }

}
