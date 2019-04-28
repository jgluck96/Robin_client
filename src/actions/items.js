

export const fetchItems = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(items => {
      dispatch({type: 'FETCH_ITEMS', payload: items})
    })
  }
}

export const addListing = item => {
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
      fetch('http://localhost:3000/own_items',{
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify({user_id: 13, item_id: itemObj.id})
      })
    })
  }
}

export const itemShow = item => {
  return {
    type: 'SHOW_ITEM',
    item: item
  }
}
// export const removeQuote = quoteId => {
//   return {
//     type: 'REMOVE_QUOTE', quoteId
//   }
// }
// export const upvoteQuote = quoteId => {
//   console.log(quoteId);
//   return {
//     type: 'UPVOTE_QUOTE', quoteId
//   }
// }
// export const downvoteQuote = quoteId => {
//   return {
//     type: 'DOWNVOTE_QUOTE', quoteId
//   }
// }
