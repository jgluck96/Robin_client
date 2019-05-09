import React, {Component} from 'react'
import { login } from '../actions/users'
import { connect } from 'react-redux'
// import Modal from './modal';
import {withRouter} from 'react-router'
import { closeModal, closeSignupModal, closeLoginModal, closeReviewModal } from '../actions/modal'




class Login extends Component {

  state = {
    email: '',
    password: ''
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // this.setState({
    //   username: '',
    //   password: ''
    // })
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accepts': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        user: this.state
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          alert(data.errors)
        } else {
          localStorage.setItem('token', data.token)
          this.props.login(data.user)
        }
      })
      .then(this.props.history.push('/')).then(() => {
        this.props.closeModal()
        this.props.closeLoginModal()
        this.props.closeSignupModal()
        this.props.closeReviewModal()
        document.getElementById('root').setAttribute('class', '')
      })
  }

  render(){
    return(
      <React.Fragment>
      <div style={{marginTop: '12%'}}>
        <form>
         <label class="form-label">Email</label>
         <input
           className="form-control"
           placeholder='email'
           name='email'
           onChange={this.handleChange}
           value={this.state.email}
           type="text">
         </input>
         <label class="form-label">Password</label>
         <input
           className="form-control"
           placeholder='password'
           type='password'
           name='password'
           onChange={this.handleChange}
           value={this.state.password}
           >
         </input>
        </form>
      </div>
      <hr />
        <div style={{float: 'right'}}>
          <button onClick={this.handleSubmit} type='submit' className="btn btn-primary px-3">Log in</button>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(null, {login, closeModal, closeSignupModal, closeLoginModal, closeReviewModal})(Login))
