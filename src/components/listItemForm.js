import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addListing } from '../actions/items'
import {withRouter} from 'react-router'
import Uploader from './Uploader';
import uploadcare from "uploadcare-widget"
import $ from 'jquery';

// import uuid from 'uuid';

class ListItemForm extends Component {

  state = {
    title: '',
    description: '',
    category: '',
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    value: '',
    rental_price: '',
    listPage: 1,
    loadValue: 33.3333,
    photos: []
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
// CE46-DY64-EB73-HF91
  handleSubmit = e => {
    e.preventDefault()

    fetch(`https://api.addressy.com/Geocoding/International/Geocode/v1.10/json3.ws?Key=CE46-DY64-EB73-HF91&Country=${this.state.country}&Location=${this.state.streetAddress + ' ' + this.state.city + ' ' + this.state.zipcode}`)
      .then(resp => resp.json())
      .then(data => {
        const item = {
          title: this.state.title,
          description: this.state.description,
          category: this.state.category,
          lat: data.Items[0].Latitude,
          lng: data.Items[0].Longitude,
          value: this.state.value,
          rental_price: this.state.rental_price,
          city: this.state.city,
          state: this.state.state
        }
        this.props.addListing(item, this.props.user.id, this.state.photos)
        this.setState({
          title: '',
          description: '',
          category: '',
          streetAddress: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          value: '',
          rental_price: '',
          photos: []
        })
        this.props.history.push('/listing-uploaded')
    })

  }

  nextPage = () => {
    this.setState((prevState) => ({
      listPage: prevState.listPage + 1,
      loadValue: prevState.loadValue + 33.3333
    }))
  }
  prevPage = () => {
    this.setState((prevState) => ({
      listPage: prevState.listPage - 1,
      loadValue: prevState.loadValue - 33.3333
    }))
  }

  removePhoto = url => {
    this.setState({photos: this.state.photos.filter(photo => photo !== url)})
  }

  componentDidUpdate(){
    if (this.state.photos.length > 0 && this.state.listPage === 1) {
      document.querySelector(".uploadcare--widget__button.uploadcare--widget__button_type_remove").addEventListener('click', () => {
        this.setState({photos: []})
      })
    }
  }

  render(){
    return(
      <div>
      <div style={{height: '8px', top: '71px'}} className="progress rounded-0 sticky-top">
        <div style={{width: `${this.state.loadValue}%`}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" className="progress-bar">
        </div>
      </div>
        <section className="py-5" style={{marginTop: '5%'}}>
          <div className="container">
            <p className="subtitle text-primary">Add new listing</p>
            <h1 className="h2 mb-5"> Add listing <span class="text-muted float-right">Step {this.state.listPage}</span></h1>
            <form>
            {this.state.listPage === 1 ?
              <div style={{marginBottom: '-3.5%'}}>
                <div className="row form-block" >

                <div class="col-lg-4">
                  <h4>Basic</h4>
                  <p class="text-muted text-sm">Some basic info to show others what your listing it about.</p>
                </div>
                <div class="col-lg-7 ml-auto">
                  <div class="form-group">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Listing title</label>
                    <input onChange={this.changeHandler} id="form_name" className="form-control" name='title' value={this.state.title} placeholder='title'/>
                  </div>
                  <div className="form-group">
                    <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                    {
                      this.state.photos.map(photo => <img style={{textAlign: 'center', width: '100px', height: '100px', margin: '10px'}} src={photo}/>)
                    }
                    </div>
                    <Uploader
                      id='file'
                      name='file'
                      type='hidden'
                      files={this.state.photos.length}
                      data-multiple="true"
                      data-crop

                      data-multiple-min="1"
                      data-multiple-max='7'
                      value={this.state.photos.toString().replace(/[\[\]']+/g,'')}
                      onUploadComplete={info => {
                        this.setState({photos: []})
                          for (let i = (info.count - 1); i > -1 ; i--) {
                            if (!this.state.photos.includes(`${info.cdnUrl}nth/${i}/`)) {
                              this.setState((prevState) => ({
                                photos: [...prevState.photos, `${info.cdnUrl}nth/${i}/`]
                              }))
                            }
                          }
                        }}
                      />
                    </div>
                </div>
              </div>
              <div className="row form-block flex-column flex-sm-row">
                  <div class="col text-center text-sm-right">
                    <div onClick={this.nextPage} class="btn btn-primary px-3">Next step<i class="fa-chevron-right fa ml-2"></i>
                    </div>
                  </div>
              </div>
            </div>
              :
              this.state.listPage === 2 ?
              <div style={{marginBottom: '4%'}}>
                <div className="row form-block">
                    <div class="col-lg-4">
                      <h4>Let's talk money</h4>
                      <p class="text-muted text-sm">What you value and how much you'd like to rent out the item per day.</p>
                    </div>

                    <div class="col-lg-7 ml-auto">
                    <div class="form-group mb-5">
                      <label  class="form-label">Item description</label>
                      <textarea id="form_description" className="form-control" onChange={this.changeHandler} name='description' value={this.state.description} placeholder='description'/>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Category</label>
                        <div className="btn btn-selectpicker form-control">
                        <select onChange={this.changeHandler} id="form_type" style={{width: '100%'}} className="btn bs-placeholder" name="category" title="Categories">
                          <option value></option>
                          <option value="Antiques">Antiques</option>
                          <option value="Automotive">Automotive</option>
                          <option value="Boats & marine">Boats & marine</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Exercise">Exercise</option>
                          <option value="Furniture">Furniture</option>
                          <option value="Kids & baby">Kids & baby</option>
                          <option value="Sports & Outdoors">Sports & Outdoors</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Value</label>
                      <input onChange={this.changeHandler} name='value' id="form_name" className="form-control" value={this.state.value} type="number" placeholder='value'/>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Rental price</label>
                      <input onChange={this.changeHandler} name='rental_price' id="form_name" className="form-control" value={this.state.rental_price} type="number" placeholder='$$/day'/>
                    </div>
                  </div>
                </div>
                  <div className="row form-block flex-column flex-sm-row">
                    <div class="col text-center text-sm-left">
                      <div onClick={this.prevPage} class="btn btn-link text-muted"> <i class="fa-chevron-left fa mr-2"></i>Back</div>
                    </div>
                      <div class="col text-center text-sm-right">
                        <div onClick={this.nextPage} class="btn btn-primary px-3">Next step<i class="fa-chevron-right fa ml-2"></i>
                        </div>
                      </div>
                  </div>
              </div>
              :
              <div>
                <div className="row form-block" style={{marginBottom: '8%'}}>
                  <div class="col-lg-4">
                    <h4>Location</h4>
                    <p class="text-muted text-sm">Where the item is located.</p>
                  </div>

                  <div class="col-lg-7 ml-auto">
                    <div class="form-group">
                      <label class="form-label">Street address</label>
                      <input onChange={this.changeHandler} id="form_street" className="form-control" name='streetAddress' value={this.state.streetAddress} placeholder='street address'/>
                    </div>
                    <div className="row">
                      <div className="col-md-5">
                        <div class="form-group">
                          <label class="form-label">City</label>
                          <input onChange={this.changeHandler} name='city' className="form-control" value={this.state.city} placeholder='city'/>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div class="form-group">
                          <label class="form-label">State</label>
                          <input onChange={this.changeHandler} name='state' className="form-control" value={this.state.state} placeholder='state'/>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Zipcode</label>
                      <input onChange={this.changeHandler} name='zipcode' className="form-control" value={this.state.zipcode} placeholder='zipcode'/>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Country</label>
                      <input onChange={this.changeHandler} name='country' className="form-control" value={this.state.country} placeholder='country'/>
                    </div>
                  </div>
                </div>
                <div className="row form-block flex-column flex-sm-row">
                  <div class="col text-center text-sm-left">
                    <div onClick={this.prevPage} class="btn btn-link text-muted"> <i class="fa-chevron-left fa mr-2"></i>Back
                    </div>
                  </div>
                  <div class="col text-center text-sm-right">
                    <button class="btn btn-primary px-3" type='submit' onClick={this.handleSubmit}>List item</button>
                  </div>
                </div>
              </div>
            }
            </form>
          </div>
        </section>
      </div>
    )
  }
}

  const mapStateToProps = state => {
    return {
      user: state.user
    }
  }

export default withRouter(connect(mapStateToProps, {addListing})(ListItemForm))
