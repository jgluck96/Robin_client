import React from 'react'
// import Mapp from './googlemaps'
// import {GoogleApiWrapper} from 'google-maps-react'
// import {GoogleApiWrapper} from 'GoogleMapsReactComponent'
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react'


class Container extends React.Component {

  state = {
    lat: '',
    lng: ''
  }

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
  //   })
  // }


  render() {
console.log(this.props.google);
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
      initialCenter={
        this.props.searchResults ?
        null
        :
        this.props.userGeo
      }
        // bounds={bounds}
        >
      {
        this.props.items.map(itemObj => {
          return (
          <Marker
          key={itemObj.id}
          title='test'
          onClick={this.onMarkerClick}
          name={'Current location'}
          markerWithLabel={window.MarkerWithLabel}
          position={{lat: itemObj.lat, lng: itemObj.lng}}
          >

          <InfoWindow
            visible={true}
            >
              <div >
                <p>Click on the ma</p>
              </div>
          </InfoWindow>
          </Marker>
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
