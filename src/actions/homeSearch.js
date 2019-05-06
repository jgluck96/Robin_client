// export const homeSearch = (data) => {
//   return (dispatch) => {
//     if (data.location) {
//       fetch(`https://api.addressy.com/Geocoding/International/Geocode/v1.10/json3.ws?Key=CE46-DY64-EB73-HF91&Country=US&Location=${data.location}`)
//         .then(resp => resp.json())
//         .then(data => {
//           // if empty array and nothong found then either alert or set default location to ip
//           const searchLocation = {lat: data.Items[0].Latitude, lng: data.Items[0].Longitude}
//           dispatch({type: 'SEARCH_LOCATION', payload: searchLocation})
//         })
//     } else if (data.category || data.itemTitle) {
//       fetch('http://localhost:3000/items')
//       .then(res => res.json())
//       .then(items => {
//         if (data.category && data.itemTitle) {
//           const searchData = items.filter(item => item.title.includes(data.itemTitle) && item.category.includes(data.category))
//           if (searchData.length === 0) {
//             dispatch({type: 'SEARCH_RESULTS', payload: 'There are no search results'})
//           } else {
//             dispatch({type: 'SEARCH_RESULTS', payload: searchData})
//           }
//         } else if (data.category) {
//
//         } else if (data.itemTitle) {
//
//         }
//       })
//     }
//
//

//   }
// }
