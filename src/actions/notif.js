export const notif = (falseReadRentals, falseReadRequests, falseReadAndExpiredRentals, falseWhatIWant) => {
  return {
    type: 'FALSE_NOTIFS',
    payload: {falseReadRentals: falseReadRentals, falseReadRequests: falseReadRequests, falseReadAndExpiredRentals: falseReadAndExpiredRentals, falseWhatIWant: falseWhatIWant}
  }
}
export const clearNotifs = () => {
  return {
    type: 'FALSE_NOTIFS',
    payload: null
  }
}
