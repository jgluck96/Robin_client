import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react'
// import Mapp from './googlemaps'
// import {GoogleApiWrapper} from 'google-maps-react'
// import {GoogleApiWrapper} from 'GoogleMapsReactComponent'
import Loading from 'react-loading-components'
import GoogleMapReact from 'google-map-react'
import $ from 'jquery'
import {fetchMapItems, fetchMapItemsSearch, mapCityState} from '../actions/items'
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


//   renderMarkers = (map, maps) => {
//   let marker = new maps.Marker({
//     position: myLatLng,
//     map,
//     title: 'Hello World!'
//   });
// }


  onGoogleApiLoaded = (map, maps) => {
    console.log(this._map);

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${map.center.lat()}+${map.center.lng()}&key=91433f02b4924a6eb4e752a3ec9d7db9`)
    .then(resp => resp.json())
    .then(data => this.props.mapCityState({city: data.results[0].components.city, state: data.results[0].components.state_code}))
    this.isInView()
    console.log(document.querySelectorAll(".item-map-pointer"))
  }

  isInView = () => {
    console.log(this._map.props);
    // fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.props.google.map.center.lat()}+${this.props.google.map.center.lng()}&key=91433f02b4924a6eb4e752a3ec9d7db9`)
    // .then(resp => resp.json())
    // .then(data => this.props.mapCityState({city: data.results[0].components.city, state: data.results[0].components.state_code}))

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
        }
    }

    if (itemIds.length > 0) {
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
      <GoogleMapReact ref={(map) => this._map = map}
      zoom={11}
      yesIWantToUseGoogleMapApiInternals={true}
      onChange={this.isInView}
      onGoogleApiLoaded={({ map, maps }) => this.onGoogleApiLoaded(map, maps)}
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
    searchResults: state.searchResults,
    mappedItems: state.mapItems
  }
}

export default connect(mapStateToProps, {fetchMapItems, fetchMapItemsSearch, mapCityState})(GoogleApiWrapper({
  apiKey: 'AIzaSyAoWjEeNWpF5PuTdxlaBj3Mx3h9Qtfp24w'
})(Container))

// <div
// lat={parseFloat(itemObj.lat.toFixed(4).toString() + (Math.random() * 1000))}
// lng={parseFloat(itemObj.lng.toFixed(4).toString() + (Math.random() * 1000))}
// className="infoWindow">
//   <div>
//    {itemObj.title}
//   </div>
// </div>
