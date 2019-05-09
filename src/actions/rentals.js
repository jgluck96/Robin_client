export const fetchMyRentals = (currentUserId) => {
  return (dispatch) => {
    fetch('http://localhost:3000/rentals')
    .then(res => res.json())
    .then(rentals => {
      const myRentals = rentals.filter(rental => rental.user_id === currentUserId)
      const myExpiringRentals = myRentals.filter(rental => rental.status === 'expiring')
      dispatch({type: 'MY_RENTALS', payload: myRentals})
      dispatch({type: 'EXPIRING_RENTALS', payload: myExpiringRentals})
    })
  }
}

export const clearMyRentals = () => {
  return {
      type: 'MY_RENTALS',
      payload: []
  }
}
export const clearExpiringRentals = () => {
  return {
      type: 'EXPIRING_RENTALS',
      payload: []
  }
}
