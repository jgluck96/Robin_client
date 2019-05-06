import React, {Component} from 'react'
import ItemCard from '../components/itemCard'
import FilterForm from '../components/filterForm'
import { connect } from 'react-redux';
import { fetchItems } from '../actions/items'
import Loading from 'react-loading-components';

import MapContainer from '../apis/googleContainer'

class ItemsContainer extends Component {

  componentDidMount() {
    this.props.fetchItems()
  }

  render(){
    // const position = [this.props.items[0].lat, this.props.items[0].lng]
    return(
      <React.Fragment>
      {this.props.userGeo ?
        <div className="row">
          <div className="col-lg-6 py-4 p-xl-5">
            <FilterForm />
            <hr className="my-4"/>
            <div className="d-flex justify-content-between align-items-center flex-column flex-md-row mb-4">
              <div className="mr-3">
                <p className="mb-3 mb-md-0"><strong>12</strong> results found</p>
              </div>
              <div>
                <label className="form-label mr-2">Sort by</label>
                <div className="dropdown bootstrap-select">
                  <select name="sort" id="form_sort" data-style="btn-selectpicker" title="" className="selectpicker" tabIndex="-98">

                  </select>
                  <div type="button" className="btn btn-selectpicker" data-toggle="dropdown" data-id="form_sort" title="Most popular">
                    <select style={{paddingRight: '7px'}} className="btn dropdown-toggle bs-placeholder btn-form-control">
                      <option>Most Popular</option>
                      <option>Price Ascending</option>
                      <option>Price Descending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
        {
          this.props.items.map(itemObj => {
            return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
          })
        }
            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination pagination-template d-flex justify-content-center">
                <li class="page-item"><div class="page-link"> <i class="fa fa-angle-left"></i></div></li>
                <li class="page-item active"><div class="page-link">1</div></li>
                <li class="page-item"><div class="page-link">2</div></li>
                <li class="page-item"><div class="page-link">3</div></li>
                <li class="page-item"><div class="page-link"> <i class="fa fa-angle-right"></i></div></li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-6 map-side-lg pr-lg-0">
            <MapContainer userGeo={this.props.userGeo} items={this.props.items}/>
          </div>
        </div>

        :
        <div style={{display: 'block', marginTop: '38%', marginLeft: '52%'}}>
        <Loading style={{top: 'auto'}} type='puff' width={100} height={100} fill='#9eebfa' />
        </div>
      }
      </React.Fragment>

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
