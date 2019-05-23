

export const fetchItems = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(items => {
      dispatch({type: 'FETCH_ITEMS', payload: items})
    })
  }
}

export const mapCityState = (csobject) => {
  return {
    type: 'MAP_CITY_STATE',
    payload: csobject
  }
}

export const fetchMapItems = (idArray) => {
  return (dispatch) => {
    fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(items => {
      const mapItems = idArray.map(id => items.find(item => item.id === id))
      dispatch({type: 'FETCH_MAP_ITEMS', payload: mapItems})
    })
  }
}

export const fetchMapItemsSearch = (idArray) => {
  return (dispatch) => {
    fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(items => {
      const mapItemsSearch = idArray.map(id => items.find(item => item.id === id))
      dispatch({type: 'FETCH_MAP_ITEMS_SEARCH', payload: mapItemsSearch})
    })
  }
}

export const addListing = (item, userId, photos) => {
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
      localStorage.setItem("currentItem", JSON.stringify(itemObj))
      fetch('http://localhost:3000/own_items',{
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify({user_id: userId, item_id: itemObj.id})
      })
      fetch('http://localhost:3000/images', {
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify({photos: photos, item_id: itemObj.id})
      })
      dispatch({type: 'SHOW_ITEM', item: itemObj})

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
        dispatch({type: 'SHOW_ITEM', item: item})
        fetch('http://localhost:3000/items')
          .then(resp => resp.json())
          .then(items => {
            // should
            const ownerItems = []
            foundUser.own_items.forEach(ownItem => {
              // ownerItems.push()
                ownerItems.push(items.find(item => item.id === ownItem.item_id))
            })
            dispatch({type: 'SHOW_ITEM_OWNER_ITEMS', payload: ownerItems.filter(ownerItem => item.id !== ownerItem.id)})
          })
      })
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
