

export const fetchItems = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(items => {
      dispatch({type: 'FETCH_ITEMS', payload: items})
    })
  }
}

export const addListing = (item, userId) => {
  return (dispatch) => {
    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({item})
    })
    .then(resp => resp.json())
    .then(itemObj => {
      console.log(userId);
      fetch('http://localhost:3000/own_items',{
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify({user_id: userId, item_id: itemObj.id})
      })
    })
  }
}

export const itemShow = item => {
  return (dispatch) => {
    fetch('http://localhost:3000/users')
      .then(resp => resp.json())
      .then(users => {
        const foundUser = users.find(user => user.own_items.includes(user.own_items.find(ownItem => ownItem.item_id === item.id)))
        dispatch({type: 'SHOW_ITEM_OWNER', payload: foundUser})
      })
      dispatch({type: 'SHOW_ITEM', item: item})
  }
}
// export const showItemOwner = item => {
//   return (dispatch) => {
//     fetch('http://localhost:3000/users')
//       .then(resp => resp.json())
//       .then(users => {
//         const foundUser = users.find(user => user.own_items.includes(user.own_items.find(ownItem => ownItem.item_id === item.id)))
//         dispatch({type:})
//       })
//   }
// }
