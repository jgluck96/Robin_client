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
    activePage: 1,
    items: this.props.items,
    searchResults: this.props.searchResults,
    searchTerm: this.props.searchTerm,
    sortType: null
  }

  componentDidMount() {
    this.props.fetchItems()
  }
  componentDidUpdate(prevState) {
    console.log(prevState);
    if (this.state.searchResults !== prevState.searchResults) {
      this.setState({searchTerm: prevState.searchTerm, searchResults: prevState.searchResults})
    }
  }

  sort = e => {
    switch (e.target.value) {
      case "Price Ascending":
        if (this.props.searchResults) {
          const sortSAsc = this.props.searchResults.sort((a,b) => a.rental_price - b.rental_price)
          this.setState({searchResults: sortSAsc, sortType: "Price Ascending"})
      } else {
        const sortAsc = this.props.items.sort((a,b) => a.rental_price - b.rental_price)
        this.setState({items: sortAsc, sortType: "Price Ascending"})
        }
        break
      case "Most Popular":
      if (this.props.searchResults) {
        const sortSMP = this.props.searchResults.sort((a,b) => b.rentals.length - a.rentals.length)
        this.setState({searchResults: sortSMP, sortType: "Most Popular"})
      } else {
        const sortMP = this.props.items.sort((a,b) => b.rentals.length - a.rentals.length)
        this.setState({items: sortMP, sortType: "Most Popular"})
      }
        break
      case "Rating":
      if (this.props.searchResults) {
        const sortSRating = this.props.searchResults.sort((a,b) => (b.reviews.length !== 0 ? Math.ceil((b.reviews.map(review => review.rating).reduce((total, num) => total + num))/b.reviews.length) : 0) - (a.reviews.length !== 0 ? Math.ceil((a.reviews.map(review => review.rating).reduce((total, num) => total + num))/a.reviews.length) : 0))
        this.setState({searchResults: sortSRating, sortType: 'Rating'})
      } else {
        const sortRating = this.props.items.sort((a,b) => (b.reviews.length !== 0 ? Math.ceil((b.reviews.map(review => review.rating).reduce((total, num) => total + num))/b.reviews.length) : 0) - (a.reviews.length !== 0 ? Math.ceil((a.reviews.map(review => review.rating).reduce((total, num) => total + num))/a.reviews.length) : 0))
        this.setState({items: sortRating, sortType: 'Rating'})
      }
        break
      case "Price Descending":
      if (this.props.searchResults) {
        const sortSDesc =this.props.searchResults.sort((a,b) => b.rental_price - a.rental_price)
        this.setState({searchResults: sortSDesc, sortType: "Price Descending"})
      } else {
        const sortDesc =this.props.items.sort((a,b) => b.rental_price - a.rental_price)
        this.setState({items: sortDesc, sortType: "Price Descending"})
      }

    }
  }

  updateState = () => {
    this.setState({searchResults: this.props.searchResults})
  }

  reset = () => {
    // this.setState({items: null, sortType: null})
    // this.setState({items: this.props.items, sortType: null})
    window.location.reload()
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
                <p className="mb-3 mb-md-0"><strong>{this.props.searchResults ? this.props.searchResults.length : this.props.items.length}</strong> results found</p>
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
              <div class="btn btn-primary mb-2">{this.state.sortType}<span style={{marginLeft: '20px', cursor: 'pointer'}} onClick={this.reset}>x</span></div>
              : null
            }
            {this.props.searchTerm ?
              <div class="btn btn-primary mb-2">{this.props.searchTerm}<span style={{marginLeft: '20px', cursor: 'pointer'}} onClick={this.reset}>x</span></div>
              : null
            }
            <div className="row">
        {   this.props.searchResults ?
          this.state.searchResults ?
          this.state.searchResults.slice((this.state.activePage * 8)-8,(this.state.activePage * 8)).map(itemObj => {
            return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
          })
          :
          this.props.searchResults.slice((this.state.activePage * 8)-8,(this.state.activePage * 8)).map(itemObj => {
            return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
          })
          :
          this.props.items.slice((this.state.activePage * 8)-8,(this.state.activePage * 8)).map(itemObj => {
            return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
          })
        }
            </div>
            <div>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={8}
              totalItemsCount={this.state.items.length}
              pageRangeDisplayed={this.state.items.length/8}
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
    searchTerm: state.searchTerm
  }
}


export default connect(mapStateToProps, {fetchItems})(ItemsContainer)
