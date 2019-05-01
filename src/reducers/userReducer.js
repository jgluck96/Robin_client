
const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      // return the user
      return action.payload

    case 'SIGNME_UP':
      return action.payload

    case 'LOGOUT':
      return action.payload


    default:
      return state
  }
}

export default userReducer
