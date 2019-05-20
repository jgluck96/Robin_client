import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react'
// import Mapp from './googlemaps'
// import {GoogleApiWrapper} from 'google-maps-react'
// import {GoogleApiWrapper} from 'GoogleMapsReactComponent'
import Loading from 'react-loading-components'
import GoogleMapReact from 'google-map-react'
import $ from 'jquery'

const AnyReactComponent = ({ text }) => <div>{text}</div>;


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

  // moving = (props,map) => {
  //   const bounds = new this.props.google.maps.LatLngBounds()
  // }

  // onMarkerMounted = c => {
  //   console.log(c);
  // }

//   isInView = () => {
//     const arr = document.querySelectorAll("img[src='https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png']")
//     console.log(arr);
//     for (let i = 0; i < arr.length; i++) {
//     var docViewTop = $(window).scrollTop();
//     var docViewBottom = docViewTop + $(window).height();
//
//     var elemTop = $(arr[i]).offset().top;
//     var elemBottom = elemTop + $(arr[i]).height();
//
//         if ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)){
//           console.log(arr[i]);
//         }
//     }
// }


  render() {
    // const points = this.props.items.map(itemObj=> {
    //   return { lat: itemObj.lat, lng: itemObj.lng }
    // })
    //
    // const bounds = new this.props.google.maps.LatLngBounds()
    //
    // for (var i = 0; i < points.length; i++) {
    //   bounds.extend(points[i])}
    //

    const style = {
      width: '50vw',
      height: '92vh'
    }

    if (!this.props.loaded) {
      return (
        <div style={{display: 'block', marginTop: '25%', marginLeft: '52%', marginBottom: '17.5%'}}>
          <Loading type='puff' width={100} height={100} fill='#9eebfa' />
        </div>
      )
    }
    return (
      <div style={style}>
      <GoogleMapReact google={this.props.google}
      zoom={10}
      onDragend={this.isInView}
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
          <div
          className="item-map-pointer"
          key={itemObj.id}
          id={itemObj.id}
          onClick={this.onMarkerClick}
          lat={parseFloat(itemObj.lat.toFixed(4).toString() + (Math.random() * 1000))}
          lng={parseFloat(itemObj.lng.toFixed(4).toString() + (Math.random() * 1000))}
          text='marker'
          >
            <span className='map-pointer-text'>
            ${itemObj.rental_price}
            </span>
          </div>
          )
        })
        :
        this.props.items.map(itemObj => {
          return (
          <div
          className="item-map-pointer"
          key={itemObj.id}
          id={itemObj.id}
          onClick={this.onMarkerClick}
          lat={parseFloat(itemObj.lat.toFixed(4).toString() + (Math.random() * 1000))}
          lng={parseFloat(itemObj.lng.toFixed(4).toString() + (Math.random() * 1000))}
          text='marker'
          >
            <span className='map-pointer-text'>
            ${itemObj.rental_price}
            </span>
          </div>
          )
        })

      }

     </GoogleMapReact>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAoWjEeNWpF5PuTdxlaBj3Mx3h9Qtfp24w'
})(Container)
