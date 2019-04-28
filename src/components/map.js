import React, {Component} from 'react'
import { connect } from 'react-redux';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';



class MapComp extends Component {

  render(){
    return(
      <div style={{height: '400px', width:'100%'}}>
      <Map center={[40.77739, -73.97799]} zoom={13}>
      <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {this.props.items.map(itemObj => {
        return <Marker position={[itemObj.lat, itemObj.lng]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
        </Marker>
      })
    }
    </Map>
    </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    items: state.items
  }
}
export default connect(mapStateToProps)(MapComp)
