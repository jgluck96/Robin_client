import React, {Component} from 'react'
import { NavLink } from "react-router-dom";
import ReactDOM from 'react-dom'
import MobileBtn from './mobileBtn'
import { connect } from 'react-redux'
import { logout } from '../actions/users'


class NavBar extends Component {

  logout = () => {
    localStorage.removeItem("token")
    this.props.logout()
  }

  render(){
    return(
      <div>
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
                          Messages
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink id='docsDropdownMenuLink' className="nav-link dropdown-toggle" to='/account'>
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
                  <li className='nav-item'>
                    <NavLink className="nav-link" to='/sign-in'>
                      Log in
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className="nav-link" to='/sign-up'>
                      Sign up
                    </NavLink>
                  </li>
                  </React.Fragment>

                    }
                  </ul>
                  </div>
        </nav>
      </div>
    )
  }
}

  const mapStateToProps = state => {
    console.log(state);
    return {
      user: state.user
    }
  }

export default connect(mapStateToProps, { logout })(NavBar)






// <MobileBtn pageWrapId={"page-wrap"}/></div>
