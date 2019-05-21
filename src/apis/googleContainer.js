import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react'
// import Mapp from './googlemaps'
// import {GoogleApiWrapper} from 'google-maps-react'
// import {GoogleApiWrapper} from 'GoogleMapsReactComponent'
import Loading from 'react-loading-components'
import GoogleMapReact from 'google-map-react'
import $ from 'jquery'
import {fetchMapItems, fetchMapItemsSearch} from '../actions/items'
import {connect} from 'react-redux'

const AnyReactComponent = ({ text }) => <div>{text}</div>;


class Container extends React.Component {

  // state = {
  //   markers: []
  // }

  // componentDidUpdate(prevState){
  //   const allMarkers = document.querySelectorAll(".item-map-pointer")
  //   console.log(allMarkers);
  //   console.log(this.state);
  //   // if (this.state.markers !== allMarkers) {
  //   //   this.isInView()
  //   // }
  // }

  onGoogleApiLoaded = () => {
    console.log('onGoogleApiLoaded');
    this.isInView()
    // console.log(document.querySelectorAll(".item-map-pointer"));
  }

  isInView = () => {
    const itemIds = []
    const arr = document.querySelectorAll(".item-map-pointer")
    // this.setState({markers: arr})
    // console.log(arr);
    // console.log($(document).scrollTop() + $(window).height());
    for (let i = 0; i < arr.length; i++) {
    const docViewTop = $(window).scrollTop();
    const docViewBottom = docViewTop + $(window).height();

    const elemTop = $(arr[i]).offset().top;
    const elemBottom = elemTop + $(arr[i]).height();

        if ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)){
          itemIds.push(parseInt(arr[i].id))
          console.log('push');
        }
    }

    if (itemIds.length > 0) {
      console.log(itemIds)
      if (this.props.searchResults) {
        this.props.fetchMapItemsSearch(itemIds)
      } else {
        this.props.fetchMapItems(itemIds)

      }
    } else {
      this.props.fetchMapItems([])
      // this.props.fetchMapItemsSearch([])

    }
}

// onGoogleApiLoaded = ({map, maps}) => {
//   this.infoWindow = new maps.InfoWindow()
// }
//
// infoWindow = item => {
//   console.log(item);
//   return (
//     <div className="infoWindow">
//       <div>
//         item.title
//       </div>
//     </div>
//   )
// }


  render() {

    // const allMarkers = document.querySelectorAll(".item-map-pointer")
    // if (this.state.markers !== allMarkers) {
    //   this.isInView()
    // }

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
      zoom={11}
      onChange={this.isInView}
      onGoogleApiLoaded={setTimeout(() => this.onGoogleApiLoaded(), 200)} //instead of just this.onGoogleApiLoaded//
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

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults
  }
}

export default connect(mapStateToProps, {fetchMapItems, fetchMapItemsSearch})(GoogleApiWrapper({
  apiKey: 'AIzaSyAoWjEeNWpF5PuTdxlaBj3Mx3h9Qtfp24w'
})(Container))
