import React, {Component} from 'react'
import ItemCard from '../components/itemCard'
import FilterForm from '../components/filterForm'
import { connect } from 'react-redux';
import { fetchItems } from '../actions/items'
import Loading from 'react-loading-components';
import Pagination from "react-js-pagination";
import MapContainer from '../apis/googleContainer'
// require("bootstrap/less/bootstrap.less")


class ItemsContainer extends Component {

  state = {
    activePage: 1
  }

  componentDidMount() {
    this.props.fetchItems()
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render(){
    console.log(this.state);
    // const position = [this.props.items[0].lat, this.props.items[0].lng]
    return(
      <React.Fragment>
      {this.props.userGeo ?
        <div className="row" style={{marginBottom: '10%'}}>
          <div className="col-lg-6 py-4 p-xl-5">
            <FilterForm />
            <hr className="my-4"/>
            <div className="d-flex justify-content-between align-items-center flex-column flex-md-row mb-4">
              <div className="mr-3">
                <p className="mb-3 mb-md-0"><strong>{this.props.items.length}</strong> results found</p>
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
        {this.state.activePage === 1 ?
          this.props.items.slice(0,8).map(itemObj => {
            return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
          })
          :
          this.state.activePage === 2 ?
            this.props.items.slice(8,15).map(itemObj => {
              return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
            })
            :
            this.state.activePage === 3 ?
              this.props.items.slice(15,22).map(itemObj => {
                return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
              })
              :
              this.state.activePage === 4 ?
                this.props.items.slice(22,29).map(itemObj => {
                  return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
                })
                :
                this.state.activePage === 5 ?
                  this.props.items.slice(29,37).map(itemObj => {
                    return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
                  })
                  :
                  null
        }
            </div>
            <div>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={8}
              totalItemsCount={this.props.items.length}
              pageRangeDisplayed={this.props.items.length/8}
              onChange={this.handlePageChange}
              itemClass={'page-item'}
              linkClass={'page-link'}
              innerClass={"pagination pagination-template d-flex justify-content-center"}
            />
            </div>
          </div>
          <div className="col-lg-6 map-side-lg pr-lg-0">
            <MapContainer userGeo={this.props.userGeo} items={this.props.items}/>
          </div>
        </div>

        :
        <div style={{display: 'block', marginTop: '25%', marginLeft: '52%', marginBottom: '12%'}}>
          <Loading type='puff' width={100} height={100} fill='#9eebfa' />
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
