import React, {Component} from 'react'
import { NavLink } from "react-router-dom";
// import ReactDOM from 'react-dom'
import MobileBtn from './mobileBtn'
import { slide as Menu } from "react-burger-menu";
import { connect } from 'react-redux'
import { openLoginModal, openSignupModal } from '../actions/modal'
import { logout } from '../actions/users'
import { fetchMyRentals, clearExpiringRentals, clearMyRentals } from '../actions/rentals'
import { clearWhatIWantRentals, clearRequests } from '../actions/requests'
import { notif, clearNotifs } from '../actions/notif'


class NavBar extends Component {

  componentDidUpdate(prevProps) {
    if(prevProps.requests !== this.props.requests){
      const falseReadAndExpiringRentals = this.props.rentals.filter(rental => rental.read === false && rental.status === 'expiring')
      const falseReadAndExpiredRentals = this.props.rentals.filter(rental => rental.read === false && rental.status === 'expired')
      const falseReadRequests = this.props.requests.filter(req => req.request.read === false)
      const falseWhatIWant = this.props.whatIWant.filter(whatIWant => whatIWant.request.read === false && whatIWant.request.accepted !== null)

      this.props.notif(falseReadAndExpiringRentals, falseReadRequests, falseReadAndExpiredRentals, falseWhatIWant)

    }
  }

  logout = () => {
    localStorage.removeItem("token")
    this.props.logout()
    this.props.clearNotifs()
    this.props.clearExpiringRentals()
    this.props.clearMyRentals()
    this.props.clearWhatIWantRentals()
    this.props.clearRequests()
  }

  openLogin = () => {
    this.props.openLoginModal()
    document.getElementById('root').setAttribute('class', 'modal-overflow')

  }

  openSignup = () => {
    this.props.openSignupModal()
    document.getElementById('root').setAttribute('class', 'modal-overflow')

  }

  checkFalse() {
    const whatIWant = this.props.whatIWant.map(whatIWant => {
      if (!whatIWant.request.read) {
        return whatIWant
      }
    })

    if (this.props.notifs) {
      if (this.props.notifs.falseWhatIWant.length > 0 || this.props.notifs.falseReadAndExpiredRentals.length > 0 || this.props.notifs.falseReadRequests.length > 0 || this.props.notifs.falseReadRentals.length > 0) {
          return 'dot'
        } else {
            return ''
          }


    }
  }

  // patchToTrue = () => {
  //
  // }

  render(){
    return(
      <div>
      <header className='header'>
        <nav className="navbar navbar-expand-lg fixed-top shadow navbar-light bg-white">
          <div className="container-fluid">
            <div className="d-flex align-items-center" style={{height: '32px'}}>
              <a className="navbar-brand py-1" href='/'>
                <img className='imgg' src="https://i.ibb.co/TTZVJWn/logo.png" alt='logo'></img>
              </a>
            </div>
            <span className="navbar-toggler navbar-toggler-right collapsed">
              <MobileBtn />
            </span>
              <div id="collshow" className="navbar-collapse collapse">
                  <ul className="navbar-nav ml-auto">
                    <li className='nav-item'>
                      <NavLink className="nav-link" to='/'>
                          Home
                      </NavLink>
                    </li>
                    <li className='nav-item'>
                    <div className='nav-item mt-3 mt-lg-0 ml-lg-3 d-xl-inline-block'>
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
                      <li className='nav-item' onClick={() => window.location.reload()}>
                        <NavLink className="nav-link" to='/inbox'>
                          Notifications
                         <span className={this.checkFalse()}></span>
                        </NavLink>
                      </li>
                      <li className='nav-item' onClick={() => window.location.reload()}>
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
      rentals: state.myRentals,
      expiringRentals: state.expiringRentals,
      notifs: state.falseNotifs,
      whatIWant: state.whatIWant
    }
  }

export default connect(mapStateToProps, { logout, openLoginModal, clearExpiringRentals, clearMyRentals, clearNotifs, openSignupModal, fetchMyRentals, notif, clearWhatIWantRentals, clearRequests })(NavBar)
