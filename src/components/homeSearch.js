import React, {Component} from 'react'
// import {homeSearch} from '../actions/homeSearch'
import {connect} from 'react-redux'

class HomeSearch extends Component {

  state = {
    itemTitle: '',
    location: '',
    category: ''
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = e => {
    e.preventDefault()
    // this.props.homeSearch(this.state);
    this.setState({
      itemTitle: '',
      location: '',
      category: ''
    })
  }


  render(){
    return(
      <div className="container py-6 py-md-7 text-white z-index-20">
        <div className="row">
          <div className="col-xl-10">
            <div className='search-bar mt-5 p-3 p-lg-1 pl-lg-4'>
              <form>
                <div className='row'>
                  <div className="col-lg-4 d-flex align-items-center form-group">
                   <input onChange={this.handleChange} value={this.state.itemTitle} name="itemTitle" className="form-control border-0 shadow-0" placeholder='what do you want?' type="text">
                   </input>
                  </div>
                  <div className="col-lg-3 d-flex align-items-center form-group">
                    <div className="input-label-absolute input-label-absolute-right w-100">
                     <input onChange={this.handleChange} value={this.state.location} name="location" id="location" className="form-control border-0 shadow-0" placeholder='location'>
                     </input>
                   </div>
                  </div>
                  <div className="col-lg-3 d-flex align-items-center form-group no-divider">
                    <div >
                      <select onChange={this.handleChange} value={this.state.category} name="category" className="btn dropdown-toggle bs-placeholder btn-form-control" title="Categories">
                        <option value>Categories...</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Sports & Outdoors">Sports & Outdoors</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <button onClick={this.submitHandler} className="btn btn-primary btn-block rounded-xl h-100" type='submit'>Search</button>
                  </div>
               </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeSearch

// <button type="button" data-toggle="dropdown" className="btn dropdown-toggle bs-placeholder btn-form-control">
// <div className="filter-option">
// <div className="filter-option-inner">
// <div className="filter-option-inner-inner">Categories
//
// </div>
// </div>
// </div>
// </button>
