import React, {Component} from 'react'
import ItemCard from '../components/itemCard'
import FilterForm from '../components/filterForm'
import { connect } from 'react-redux';
import { fetchItems, itemShow } from '../actions/items'
import Loading from 'react-loading-components';
import Pagination from "react-js-pagination";
import MapContainer from '../apis/googleContainer'
// require("bootstrap/less/bootstrap.less")


class ItemsContainer extends Component {

  state = {
    activePage: 1,
    items: this.props.items,
    searchResults: this.props.searchResults,
    searchTerm: this.props.searchTerm,
    sortType: null
  }

  componentDidMount() {
    this.props.fetchItems()
    this.props.itemShow(null)

  }
  componentDidUpdate(prevState, prevProps) {
    if (this.state.searchResults !== prevState.fetchMapItemsSearch) {
      this.setState({searchTerm: prevState.searchTerm, searchResults: prevState.mapItemsSearch})
    }
    if (this.props.items !== this.state.items) {
      this.setState({items: prevState.items})
    }
  }

  sort = e => {
    switch (e.target.value) {
      case "Price Ascending":
        if (this.props.MapItemsSearch) {
          const sortSAsc = this.props.MapItemsSearch.sort((a,b) => a.rental_price - b.rental_price)
          this.setState({searchResults: sortSAsc, sortType: "Price Ascending"})
      } else {
        const sortAsc = this.props.MapResults.sort((a,b) => a.rental_price - b.rental_price)
        this.setState({items: sortAsc, sortType: "Price Ascending"})
        }
        break
      case "Most Popular":
      if (this.props.MapItemsSearch) {
        const sortSMP = this.props.MapItemsSearch.sort((a,b) => b.rentals.length - a.rentals.length)
        this.setState({searchResults: sortSMP, sortType: "Most Popular"})
      } else {
        const sortMP = this.props.MapResults.sort((a,b) => b.rentals.length - a.rentals.length)
        this.setState({items: sortMP, sortType: "Most Popular"})
      }
        break
      case "Rating":
      if (this.props.MapItemsSearch) {
        const sortSRating = this.props.MapItemsSearch.sort((a,b) => (b.reviews.length !== 0 ? Math.ceil((b.reviews.map(review => review.rating).reduce((total, num) => total + num))/b.reviews.length) : 0) - (a.reviews.length !== 0 ? Math.ceil((a.reviews.map(review => review.rating).reduce((total, num) => total + num))/a.reviews.length) : 0))
        this.setState({searchResults: sortSRating, sortType: 'Rating'})
      } else {
        const sortRating = this.props.MapResults.sort((a,b) => (b.reviews.length !== 0 ? Math.ceil((b.reviews.map(review => review.rating).reduce((total, num) => total + num))/b.reviews.length) : 0) - (a.reviews.length !== 0 ? Math.ceil((a.reviews.map(review => review.rating).reduce((total, num) => total + num))/a.reviews.length) : 0))
        this.setState({items: sortRating, sortType: 'Rating'})
      }
        break
      case "Price Descending":
      if (this.props.MapItemsSearch) {
        const sortSDesc =this.props.MapItemsSearch.sort((a,b) => b.rental_price - a.rental_price)
        this.setState({searchResults: sortSDesc, sortType: "Price Descending"})
      } else {
        const sortDesc =this.props.MapResults.sort((a,b) => b.rental_price - a.rental_price)
        this.setState({items: sortDesc, sortType: "Price Descending"})
      }
      default:
    }
  }

  updateState = () => {
    this.setState({searchResults: this.props.searchResults})
  }

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
    window.scrollTo(100,100)
  }

  render(){

    // const position = [this.props.items[0].lat, this.props.items[0].lng]
    return(
      <React.Fragment>
      {this.props.userGeo ?
        <div className="row" style={{marginBottom: '2%'}}>
          <div className="col-lg-6 py-4 p-xl-5">
            <FilterForm />
            <div className="d-flex justify-content-between align-items-center flex-column flex-md-row mb-4">
              <div className="mr-3">
                <p className="mb-3 mb-md-0"><strong>{this.props.MapItemsSearch ? this.props.MapItemsSearch.length : this.props.MapResults ? this.props.MapResults.length : null}</strong> results found</p>
              </div>
              <div>
                <label className="form-label mr-2">Sort by</label>
                <div className="dropdown bootstrap-select">
                  <select name="sort" id="form_sort" data-style="btn-selectpicker" title="" className="selectpicker" tabIndex="-98">

                  </select>
                  <div type="button" className="btn btn-selectpicker" data-toggle="dropdown" data-id="form_sort" title="Most popular">
                    <select style={{paddingRight: '7px'}} onChange={this.sort} className="btn dropdown-toggle bs-placeholder btn-form-control">
                      <option>Most Popular</option>
                      <option>Price Ascending</option>
                      <option>Price Descending</option>
                      <option>Rating</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {this.state.sortType ?
              <div className="btn btn-primary mb-2">{this.state.sortType}<span style={{marginLeft: '20px', cursor: 'pointer'}} onClick={this.reset}>x</span></div>
              : null
            }
            {this.props.searchTerm ?
              <div className="btn btn-primary mb-2">{this.props.searchTerm}<span style={{marginLeft: '20px', cursor: 'pointer'}} onClick={this.reset}>x</span></div>
              : null
            }
            <div className="row">
        {   this.props.MapItemsSearch ?
          this.state.searchResults ?
          this.state.searchResults.slice((this.state.activePage * 8)-8,(this.state.activePage * 8)).map(itemObj => {
            return <ItemCard key={Math.random(100)} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
          })
          :
          this.props.MapItemsSearch.slice((this.state.activePage * 8)-8,(this.state.activePage * 8)).map(itemObj => {
            return <ItemCard key={Math.random(100)} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
          })
          :
          this.props.mapItems ? this.props.mapItems.slice((this.state.activePage * 8)-8,(this.state.activePage * 8)).map(itemObj => {
            return <ItemCard key={Math.random(100)} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
          }) : null
        }
            </div>
            <div >
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={8}
              totalItemsCount={this.props.mapItems ? this.props.mapItems.length : null}
              pageRangeDisplayed={this.props.mapItems ? this.props.mapItems.length/8 : null}
              onChange={this.handlePageChange}
              itemClass={'page-item'}
              linkClass={'page-link'}
              innerClass={"pagination pagination-template d-flex justify-content-center"}
            />
            </div>
          </div>
          <div className="col-lg-6 map-side-lg pr-lg-0">
            <MapContainer userGeo={this.props.userGeo} searchResults={this.props.searchResults} searchLocation={this.props.searchLocation} items={this.props.items}/>
          </div>
        </div>

        :
        <div style={{display: 'block', marginTop: '25%', marginLeft: '52%', marginBottom: '17.5%'}}>
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
    userGeo: state.userGeo,
    searchResults: state.searchResults,
    searchLocation: state.searchLocation,
    searchTerm: state.searchTerm,
    mapItems: state.fetchMapItems,
    MapResults: state.fetchMapItems,
    MapItemsSearch: state.fetchMapItemsSearch
  }
}


export default connect(mapStateToProps, {fetchItems, itemShow})(ItemsContainer)
