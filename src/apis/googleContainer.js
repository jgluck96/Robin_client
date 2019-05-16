import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react'
// import Mapp from './googlemaps'
// import {GoogleApiWrapper} from 'google-maps-react'
// import {GoogleApiWrapper} from 'GoogleMapsReactComponent'


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
      center={this.props.searchLocation ?
      this.props.searchLocation
      :
    this.props.userGeo}
      initialCenter={
        this.props.searchLocation ?
        this.props.searchLocation
        :
        this.props.userGeo
      }
        // bounds={bounds}
        >
      {this.props.searchResults ?
        this.props.searchResults.map(itemObj => {
          return (
          <Marker ref={this.onMarkerMounted}
          key={itemObj.id}
          title='test'
          onClick={this.onMarkerClick}
          name={'Current location'}
          markerWithLabel={window.MarkerWithLabel}
          position={{lat: itemObj.lat, lng: itemObj.lng}}
          >
          </Marker>
          )
        })
        :
        this.props.items.map(itemObj => {
          return (
          <Marker ref={this.onMarkerMounted}
          key={itemObj.id}
          title='test'
          onClick={this.onMarkerClick}
          name={'Current location'}
          markerWithLabel={window.MarkerWithLabel}
          position={{lat: itemObj.lat, lng: itemObj.lng}}
          >
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
