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

  componentDidUpdate(prevState){
    if (prevState.fetchMapItems !== this.props.mappedItems) {
      setTimeout(() => this.isInView(), 500)

    }
    // console.log(prevState.fetchMapItems);
  }

  onGoogleApiLoaded = (map, maps) => {
    console.log(this._map);

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${map.center.lat()}+${map.center.lng()}&key=91433f02b4924a6eb4e752a3ec9d7db9`)
    .then(resp => resp.json())
    .then(data => this.props.mapCityState({city: data.results[0].components.city, state: data.results[0].components.state_code}))
    this.isInView()
    console.log(document.querySelectorAll(".item-map-pointer"))
  }

  isInView = () => {
    // console.log(this._map.props);
    const itemIds = []
    const arr = document.querySelectorAll(".item-map-pointer")
    for (let i = 0; i < arr.length; i++) {
      const width = $(window).width()
      console.log(width);
      const docViewLeft = $(window).scrollLeft() + width/2
      const docViewRight = width - $(window).scrollLeft()
      const elemWidth = $(arr[i]).offset().left + width/30
      const docViewTop = $(window).scrollTop();
      const docViewBottom = docViewTop + $(window).height();
      const elemTop = $(arr[i]).offset().top;
      const elemBottom = elemTop + $(arr[i]).height();

        if ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemWidth >= docViewLeft) && (elemWidth <= docViewRight)){
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

  render() {


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
