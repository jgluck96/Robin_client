import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addListing } from '../actions/items'
import uuid from 'uuid';

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
    rental_price: ''
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
          id: uuid()
        }
        this.props.addListing(item, this.props.user.id)
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
          rental_price: ''
        })
    })
  }

  render(){
    return(
      <div style={{margin:'100px'}}>
        <form>
        <input onChange={this.changeHandler} name='title' value={this.state.title} placeholder='title'/>
        <textarea onChange={this.changeHandler} name='description' value={this.state.description} placeholder='description'/>
        <div>
          <select onChange={this.changeHandler} name="category" title="Categories">
            <option value>Categories..</option>
            <option value="Furniture">Furniture</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
          </select>
        </div>
        <input onChange={this.changeHandler} name='value' value={this.state.value} type="number" placeholder='value'/>
        <input onChange={this.changeHandler} name='rental_price' value={this.state.rental_price} type="number" placeholder='$$/day'/>
        <input onChange={this.changeHandler} name='streetAddress' value={this.state.streetAddress} placeholder='street address'/>
        <input onChange={this.changeHandler} name='city' value={this.state.city} placeholder='city'/>
        <input onChange={this.changeHandler} name='state' value={this.state.state} placeholder='state'/>
        <input onChange={this.changeHandler} name='zipcode' value={this.state.zipcode} placeholder='zipcode'/>
        <input onChange={this.changeHandler} name='country' value={this.state.country} placeholder='country'/>
        <button type='submit' onClick={this.handleSubmit}>List item</button>
        </form>
      </div>
    )
  }
}

  const mapStateToProps = state => {
    return {
      user: state.user
    }
  }

export default connect(mapStateToProps, {addListing})(ListItemForm)
