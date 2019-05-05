import React, {Component} from 'react'
import { login } from '../actions/users'
import { connect } from 'react-redux'
import Modal from './modal';
import {withRouter} from 'react-router'



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
      .then(this.props.history.push('/'))
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
         <input
           placeholder='email'
           name='email'
           onChange={this.handleChange}
           value={this.state.email}
           type="text">
         </input>
         <input
           placeholder='password'
           name='password'
           onChange={this.handleChange}
           value={this.state.password}
           type="text">
         </input>
         <button type='submit'>Log in</button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null, {login})(Login))
