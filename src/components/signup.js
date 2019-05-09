import React, {Component} from 'react'
// import ReactDOM from 'react-dom'
import {signmeUp} from '../actions/users'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
// import {login} from '../actions/users'
// import Modal from './modal'
import { closeModal, closeSignupModal, closeLoginModal, closeReviewModal } from '../actions/modal'




class Signup extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    bio: '',
    funds: 0.00,
    img: 'http://www.gravatar.com/avatar/?d=mm'
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.props.signmeUp(this.state)
    this.props.history.push('/')
    this.props.closeModal()
    this.props.closeLoginModal()
    this.props.closeSignupModal()
    this.props.closeReviewModal()
    document.getElementById('root').setAttribute('class', '')
    this.setState({
      email: '',
      password: '',
      bio: ''
    })

  }

  render(){
    return(
      <React.Fragment>
      <div style={{marginTop: '10%'}}>
        <form>
          <label class="form-label">Full Name</label>
          <input
          className="form-control"
          placeholder='name'
          type="text"
          name='name'
          onChange={this.handleChange}
          value={this.state.name}
          >
          </input>
          <label class="form-label">Email</label>
          <input
          className="form-control"
          placeholder='email'
          type="text"
          name='email'
          onChange={this.handleChange}
          value={this.state.email}
          >
          </input>
          <label class="form-label">Password</label>
          <input
          className="form-control"
          placeholder='password'
          type="text"
          name='password'
          type='password'
          onChange={this.handleChange}
          value={this.state.password}
          >
          </input>
        </form>
      </div>
      <hr />
        <div style={{float: 'right'}}>
          <button onClick={this.handleSubmit} type='submit' className="btn btn-primary px-3">Sign up</button>
        </div>
      </React.Fragment>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     signmeUp: (user) => dispatch(signmeUp(user))
//   }
// }

export default withRouter(connect(null, { signmeUp, closeModal, closeSignupModal, closeLoginModal, closeReviewModal })(Signup))
