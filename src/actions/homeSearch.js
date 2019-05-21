export const homeSearch = (data) => {
  return (dispatch) => {
    if (data.location) {
      fetch(`https://api.addressy.com/Geocoding/International/Geocode/v1.10/json3.ws?Key=CE46-DY64-EB73-HF91&Country=US&Location=${data.location}`)
        .then(resp => resp.json())
        .then(coord => {
          if (coord.Items.length > 0){
            const searchLocation = {lat: coord.Items[0].Latitude, lng: coord.Items[0].Longitude}
            dispatch({type: 'SEARCH_LOCATION', payload: searchLocation})
          }
        })
    } if (data.itemTitle) {
      console.log('here in itemtitle');
      fetch('http://localhost:3000/items')
      .then(res => res.json())
      .then(items => {

        const searchData = items.filter(item => item.title.toLowerCase().includes(data.itemTitle.toLowerCase()))
        if (searchData.length === 0) {
          dispatch({type: 'FETCH_ITEMS', payload: items})
        } else {
          dispatch({type: 'SEARCH_RESULTS', payload: searchData})
          dispatch({type: 'SEARCH_TERM', payload: data.itemTitle})
        }
      })
    }

  }
}
