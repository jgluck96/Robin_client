export const signmeUp = (user) => {
  return dispatch => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        "Accepts": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        user: user
      })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('token', data.token)
        dispatch({
          type: 'SIGNME_UP',
          payload: data.user
        })
      })
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: ''
  }
}

export const login = (user) => {
  return {
    type: 'LOGIN',
    payload: user
  }
}

export const autoLogin = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/auto_login', {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        console.log(data);
        dispatch({ type: 'LOGIN', payload: data.user })
      }
    })
  }
}

export const itemShow = item => {
  return {
    type: 'SHOW_ITEM',
    item: item
  }
}
