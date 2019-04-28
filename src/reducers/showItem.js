export default (state = [], action) => {
  switch (action.type) {
    case 'SHOW_ITEM':
      return action.item

    default:
      return state
  }

}
