import React, {Component} from 'react'
import { NavLink } from "react-router-dom";
// import ReactDOM from 'react-dom'
// import MobileBtn from './mobileBtn'
import { connect } from 'react-redux'
import { openLoginModal, openSignupModal } from '../actions/modal'
import { logout } from '../actions/users'
import { fetchMyRentals } from '../actions/rentals'


class NavBar extends Component {
  //
  // getRentals = () => {
  //
  // }


  logout = () => {
    localStorage.removeItem("token")
    this.props.logout()
  }

  openLogin = () => {
    this.props.openLoginModal()
    document.getElementById('root').setAttribute('class', 'modal-overflow')

  }

  openSignup = () => {
    this.props.openSignupModal()
    document.getElementById('root').setAttribute('class', 'modal-overflow')

  }

  render(){
    return(
      <div>
      <header className='header'>
        <nav className="navbar navbar-expand-lg fixed-top shadow navbar-light bg-white">
          <div className="container-fluid">
            <div>
              <a href='/'>
                <img className='imgg' src="https://i.ibb.co/TTZVJWn/logo.png" alt='logo'></img>
              </a>
            </div>
                  <ul className="navbar-nav ml-auto">
                    <li className='nav-item'>
                      <NavLink className="nav-link" to='/'>
                          Home
                      </NavLink>
                    </li>
                    <li className='nav-item'>
                    <div className='nav-item mt-3 mt-lg-0 ml-lg-3 d-lg-none d-xl-inline-block'>
                    <NavLink className="btn btn-primary" to='/create-listing'>
                    ADD LISTING
                    </NavLink>
                    </div>
                    </li>
                    <li className='nav-item'>
                      <NavLink className="nav-link" to='/browse-all'>
                          Browse All
                      </NavLink>
                    </li>
                    {this.props.user ?
                      <React.Fragment>
                      <li className='nav-item'>
                        <NavLink className="nav-link" to='/inbox'>
                          Notifications
                         <span style={this.props.expiringRentals > 0 ? {color: 'red'} : {color: 'white'}}>0</span>
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink className="nav-link" to='/account'>
                          Account
                        </NavLink>
                      </li>
                      <li className='nav-item' onClick={this.logout}>
                        <NavLink className="nav-link" to='/'>
                          Log out
                        </NavLink>
                      </li>
                      </React.Fragment>
                    :
                    <React.Fragment>
                  <li className='nav-item' onClick={this.openLogin}>
                    <div style={{cursor: 'pointer'}} className="nav-link" >
                      Log in
                    </div>
                  </li>
                  <li className='nav-item' onClick={this.openSignup}>
                    <div style={{cursor: 'pointer'}} className="nav-link">
                      Sign up
                    </div>
                  </li>
                  </React.Fragment>

                    }
                  </ul>
                  </div>
        </nav>
        </header>
      </div>
    )
  }
}

  const mapStateToProps = state => {
    return {
      user: state.user,
      requests: state.requests,
      expiringRentals: state.expiringRentals
    }
  }

export default connect(mapStateToProps, { logout, openLoginModal, openSignupModal, fetchMyRentals })(NavBar)
