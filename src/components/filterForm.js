import React, {Component} from 'react'
import {connect} from 'react-redux'

class FilterForm extends Component {

  loc = () => {
    console.log('hh');
    // fetch(`https://api.addressy.com/Geocoding/International/ReverseGeocode/v2.00/csv.ws?Key=CE46-DY64-EB73-HF91&Latitude=${this.props.userGeo.lat}&Longitude=${this.props.userGeo.lng}`)
    // .then(resp => resp.json())
    // .then(data => console.log(data))
  }

  // componentDidMount(){
  //   this.loc()
  // }

  render(){
    return(
      <React.Fragment>
      <h2 className="mb-4">Rent in {this.props.mapCityState ? this.props.mapCityState.city + ', ' + this.props.mapCityState.state : null}</h2>
        <hr style={{paddingTop:'1px'}}/>
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return{
    mapCityState: state.mapCityState
  }
}

export default connect(mapStateToProps)(FilterForm)
