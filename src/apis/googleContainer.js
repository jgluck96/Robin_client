import React from 'react'
// import Mapp from './googlemaps'
// import {GoogleApiWrapper} from 'google-maps-react'
// import {GoogleApiWrapper} from 'GoogleMapsReactComponent'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'


class Container extends React.Component {



  render() {

    const points = this.props.items.map(itemObj=> {
      return { lat: itemObj.lat, lng: itemObj.lng }
    })

    const bounds = new this.props.google.maps.LatLngBounds()
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i])}


    const style = {
      width: '40vw',
      height: '90vh'
    }

    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div style={style}>
      <Map google={this.props.google}
      zoom={14}
      initialCenter={//change initial location to user's
      // lat/lng coordinates from their account(user table attributes)
        this.props.items.length > 0 ?
        {
            lat: this.props.items[0].lat,
            lng: this.props.items[0].lng
        }
        :
        {	lat: 40.70746, lng:	-74.00432}
      }
        bounds={bounds}>
      {
        this.props.items.map(itemObj => {
          return (
          <Marker
          key={itemObj.id}
          onClick={this.onMarkerClick}
          name={'Current location'}
          position={{lat: itemObj.lat, lng: itemObj.lng}}
          />
          )
        })

      }


     </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAoWjEeNWpF5PuTdxlaBj3Mx3h9Qtfp24w'
})(Container)
