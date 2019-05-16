import React, {Component} from 'react'
import {homeSearch} from '../actions/homeSearch'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class HomeSearch extends Component {

  state = {
    itemTitle: '',
    location: ''
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.homeSearch(this.state)
    this.props.history.push('/browse-all')
    this.setState({
      itemTitle: '',
      location: ''
    })
  }


  render(){
    return(
      <div className="container py-6 py-md-7 text-white z-index-20">
        <div style={{display: 'flex',  alignItems: 'center', flexDirection: 'column'}} className="row">
          <div  className="col-xl-10">
            <div className='search-bar mt-5 p-3 p-lg-1 pl-lg-4'>
              <form>
                <div className='row'>
                  <div className="col-lg-5 d-flex align-items-center form-group">
                   <input onChange={this.handleChange} value={this.state.itemTitle} name="itemTitle" className="form-control border-0 shadow-0" placeholder='what do you want?' type="text">
                   </input>
                  </div>
                  <div className="col-lg-4 d-flex align-items-center form-group">
                    <div className="input-label-absolute input-label-absolute-right w-100">
                       <label for="location" class="label-absolute">
                        <i class="fa fa-crosshairs"></i>
                        <span class="sr-only">City</span>
                     </label>
                     <input onChange={this.handleChange} value={this.state.location} name="location" id="location" className="form-control border-0 shadow-0" placeholder='New York, NY'>
                     </input>
                   </div>
                  </div>
                  <div className="col-lg-3">
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

export default withRouter(connect(null, {homeSearch})(HomeSearch))
