import React, {Component} from 'react'
import ItemCard from '../components/itemCard'
import FilterForm from '../components/filterForm'
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
          <FilterForm />
          <hr className="my-4"/>
          <div className="d-flex justify-content-between align-items-center flex-column flex-md-row mb-4">
            <div className="mr-3">
              <p className="mb-3 mb-md-0"><strong>12</strong> results found</p>
            </div>
            <div>
              <label for="form_sort" className="form-label mr-2">Sort by</label>
              <div className="dropdown bootstrap-select"><select name="sort" id="form_sort" data-style="btn-selectpicker" title="" className="selectpicker" tabindex="-98">
              </select><button type="button" className="btn dropdown-toggle btn-selectpicker" data-toggle="dropdown" role="button" data-id="form_sort" title="Most popular"><div className="filter-option"><div className="filter-option-inner"><div className="filter-option-inner-inner">Most popular</div></div> </div></button><div className="dropdown-menu " role="combobox"><div className="inner show" role="listbox" aria-expanded="false" tabindex="-1"><ul className="dropdown-menu inner show"></ul></div></div></div>
            </div>
          </div>
          <div className="row">
        {
          this.props.items.map(itemObj => {
            return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
          })
        }
          </div>
        </div>
          <div className="col-lg-6 map-side-lg pr-lg-0">
            <MapContainer userGeo={this.props.userGeo} items={this.props.items}/>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    userGeo: state.userGeo
  }
}


export default connect(mapStateToProps, {fetchItems})(ItemsContainer)
