

export const fetchRequests = (currentUserId) => {
  return (dispatch) => {
    fetch('http://localhost:3000/requests')
    .then(res => res.json())
    .then(requests => {
      const myRequests = requests.filter(request => request.receiver_id === currentUserId)
      fetch('http://localhost:3000/items')
        .then(res => res.json())
        .then(items => {
          const allArr = []
          myRequests.forEach(request => {
            const foundItem = items.find(item => item.id === request.item_id)
            allArr.push({request: request, itemObj: foundItem, requesterObj: request.requester})
          })
            dispatch({type: 'FETCH_REQUESTS', payload: allArr})
        })
    })
  }
}

export const fetchWhatIWant = (currentUserId) => {
  console.log('here');
  return (dispatch) => {
    fetch('http://localhost:3000/requests')
    .then(res => res.json())
    .then(requests => {
      const whatIWant = requests.filter(request => request.requester_id === currentUserId)
      fetch('http://localhost:3000/items')
        .then(res => res.json())
        .then(items => {
          const wIWArr = []
          whatIWant.forEach(request => {
            const foundItemWIW = items.find(item => item.id === request.item_id)
            wIWArr.push({request: request, itemObj: foundItemWIW, receiverObj: request.receiver})
          })
            dispatch({type: 'FETCH_WHATIWANT', payload: wIWArr})
        })
    })
  }
}

export const requestAccepted = (reqId, currentUserId) => {
  return dispatch => {
  fetch(`http://localhost:3000/requests/${reqId}`, {
    method: 'PATCH',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      accepted: true
    })
  })
  .then(resp => resp.json())
  .then(data => {
    dispatch(fetchRequests(currentUserId))
  })
}
}

export const requestDenied = (reqId, currentUserId) => {
  return dispatch => {
  fetch(`http://localhost:3000/requests/${reqId}`, {
    method: 'PATCH',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      accepted: false
    })
  })
  .then(resp => resp.json())
  .then(data => {
    dispatch(fetchRequests(currentUserId))
  }).then(dispatch(fetchWhatIWant(currentUserId)))
}
}
