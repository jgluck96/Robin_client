

export default (state= [], action) => {
  switch (action.type) {
    case 'SHOW_ITEM_OWNER_ITEMS':
      return action.payload

    default:
      return state
  }

}
