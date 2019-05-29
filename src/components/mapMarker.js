import React, {Component} from 'react'

export default class MapMarker extends Component {
  render(){
    return(
      <div
      className="item-map-pointer"
      
      >
      {this.props.children}
      </div>
    )
  }
}
