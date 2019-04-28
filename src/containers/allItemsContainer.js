import React, {Component} from 'react'
import ItemCard from '../components/itemCard'
import { connect } from 'react-redux';
import { fetchItems } from '../actions/items'

import MapContainer from '../apis/googleContainer'

class ItemsContainer extends Component {

  componentDidMount() {
    this.props.fetchItems()
  }

  render(){
    // const position = [this.props.items[0].lat, this.props.items[0].lng]
    return(
      <div className="row">
        <div className="col-lg-6 py-4 p-xl-5">
          <div className="row">
        {
          this.props.items.map(itemObj => {
            return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
          })
        }
        </div>
       </div>
       <div className="col-lg-6 map-side-lg pr-lg-0">
        <MapContainer items={this.props.items}/>
       </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}


export default connect(mapStateToProps, {fetchItems})(ItemsContainer)
