
// <form id="contact-form" method="get" action="#" class="form">
  // <div class="col-sm-6">
    // <div class="form-group">
      // <label for="rating" class="form-label">Your rating *</label>
      // <select name="rating" id="rating" class="custom-select focus-shadow-0">
        // <option value="5">★★★★★ (5/5)</option>
        // <option value="4">★★★★☆ (4/5)</option>
        // <option value="3">★★★☆☆ (3/5)</option>
        // <option value="2">★★☆☆☆ (2/5)</option>
        // <option value="1">★☆☆☆☆ (1/5)</option>
      // </select>
    // </div>
  // </div>
  //
  // <div class="form-group">
    // <label for="review" class="form-label">Review text *</label>
    // <textarea rows="4" name="review" id="review" placeholder="Enter your review" required="required" class="form-control"></textarea>
  // </div>
    // <button type="submit" class="btn btn-primary">Post review</button>
// </form>
import React, {Component} from 'react'
import { login } from '../actions/users'
import { connect } from 'react-redux'
// import Modal from './modal';
import {withRouter} from 'react-router'
import { closeModal, closeSignupModal, closeLoginModal, closeReviewModal } from '../actions/modal'




class Review extends Component {

  state = {
    comment: '',
    rating: 0
  }



  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/reviews', {
      method: 'POST',
      headers: {
        'Accepts': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        comment: this.state.comment,
        rating: parseInt(this.state.rating),
        item_id: this.props.reviewModal.item.id,
        user_id: this.props.user.id
      })
    })
      .then(res => res.json())
      .then(data => {
          console.log(data);
      })
      .then(this.props.history.push('/')).then(() => {
        this.props.closeModal()
        this.props.closeLoginModal()
        this.props.closeSignupModal()
        this.props.closeReviewModal()
        document.getElementById('root').setAttribute('class', '')
        //DELETE NOTIFICATION
      })
  }

  render(){
    console.log(this.state);
    return(
      <React.Fragment>
      <div style={{marginTop: '12%'}}>
        <form>
          <div class="form-group">
           <label for="rating" class="form-label">Your rating *</label>
           <select onChange={this.handleChange} name="rating" id="rating" class="custom-select focus-shadow-0">
             <option value="5">★★★★★ (5/5)</option>
             <option value="4">★★★★☆ (4/5)</option>
             <option value="3">★★★☆☆ (3/5)</option>
             <option value="2">★★☆☆☆ (2/5)</option>
             <option value="1">★☆☆☆☆ (1/5)</option>
           </select>
         </div>
         <div class="form-group">
           <label class="form-label">Review</label>
           <textarea
            rows="4"
            name="comment"
            id="review"
            placeholder="Enter your review"
            required="required"
            class="form-control"
            onChange={this.handleChange}
            value={this.state.review}
            >
            </textarea>
          </div>
        </form>
      </div>
      <hr />
        <div style={{float: 'right'}}>
          <button onClick={this.handleSubmit} type='submit' className="btn btn-primary px-3">Submit review</button>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.user,
    reviewModal: state.reviewModal
  }
}

export default withRouter(connect(mapStateToProps, {login, closeModal, closeSignupModal, closeLoginModal, closeReviewModal })(Review))
