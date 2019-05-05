import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {signmeUp} from '../actions/users'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {login} from '../actions/users'
import Modal from './modal'



class Signup extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    bio: '',
    funds: 0.00
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
    this.setState({
      email: '',
      password: '',
      bio: ''
    })

  }

  render(){
    return(
<div>

        <form onSubmit={this.handleSubmit}>
          <input
          placeholder='name'
          type="text"
          name='name'
          onChange={this.handleChange}
          value={this.state.name}
          >
          </input>
          <input
          placeholder='bio'
          type="text"
          name='bio'
          onChange={this.handleChange}
          value={this.state.bio}
          >
          </input>
          <input
          placeholder='email'
          type="text"
          name='email'
          onChange={this.handleChange}
          value={this.state.email}
          >
          </input>
          <input
          placeholder='password'
          type="text"
          name='password'
          onChange={this.handleChange}
          value={this.state.password}
          >
          </input>
          <button type='submit'>Sign up</button>
        </form>

</div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signmeUp: (user) => dispatch(signmeUp(user))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Signup))
