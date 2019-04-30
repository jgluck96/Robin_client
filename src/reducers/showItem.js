

export default (state=JSON.parse(localStorage.getItem('currentItem')), action) => {
  switch (action.type) {
    case 'SHOW_ITEM':
      return action.item

    default:
      return state
  }

}
