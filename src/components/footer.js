import React, {Component} from 'react'
import { openLoginModal, openSignupModal } from '../actions/modal'
import {connect} from 'react-redux'
import { clearNotifs } from '../actions/notif'
import { logout } from '../actions/users'
import { clearWhatIWantRentals, clearRequests } from '../actions/requests'
import { clearExpiringRentals, clearMyRentals } from '../actions/rentals'


class Footer extends Component {

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

  render(){
    return(
<footer className="position-relative fixed-bottom z-index-10">
      <div className="py-5 bg-gray-200 text-muted">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="font-weight-bold text-uppercase text-dark mb-3">Directory</div>
              <p>The peer to peer rental marketplace</p>
              <ul className="list-inline">
                <li className="list-inline-item"><div target="_blank" title="twitter" className="text-muted text-hover-primary"><i className="fab fa-twitter"></i></div></li>
                <li className="list-inline-item"><div target="_blank" title="facebook" className="text-muted text-hover-primary"><i className="fab fa-facebook"></i></div></li>
                <li className="list-inline-item"><div target="_blank" title="instagram" className="text-muted text-hover-primary"><i className="fab fa-instagram"></i></div></li>
                <li className="list-inline-item"><div target="_blank" title="pinterest" className="text-muted text-hover-primary"><i className="fab fa-pinterest"></i></div></li>
                <li className="list-inline-item"><div target="_blank" title="vimeo" className="text-muted text-hover-primary"><i className="fab fa-vimeo"></i></div></li>
              </ul>
            </div>
            <div className="col-lg-2 mb-lg-0">
              <h6 className="text-uppercase text-dark mb-3">Account</h6>
              {this.props.user ?
              <ul className="list-unstyled">
                <li><a href="/account" className="text-muted">My profile</a></li>
                <li><a href="/inbox" className="text-muted">Notifications</a></li>
                <li onClick={this.logout}><a href='/' className="text-muted">Log out</a></li>
              </ul>
              :
              <ul className="list-unstyled">
                <li><div style={{cursor: 'pointer'}} onClick={this.openLogin} className="text-muted">Log in</div></li>
                <li><div style={{cursor: 'pointer'}} onClick={this.openSignup} className="text-muted">Sign up</div></li>
              </ul>
              }
            </div>
            <div className="col-lg-2 mb-lg-0">
              <h6 className="text-uppercase text-dark mb-3">Tid Bits</h6>
              <ul className="list-unstyled">
                <li><a href="/browse-all" className="text-muted">Browse items</a></li>
                <li><a target="_blank" href="https://medium.com/@joshgluck1" className="text-muted">Blog</a></li>
                <li><a href="/" className="text-muted">Home</a></li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h6 className="text-uppercase text-dark mb-3">Newsletter</h6>
              <p className="mb-3"> Sign up for our newsletter to receive weekly offers and discounts</p>
              <form action="#" id="newsletter-form">
                <div className="input-group mb-3">
                  <input type="email" placeholder="Your Email Address" aria-label="Your Email Address" className="form-control bg-transparent border-dark border-right-0" />
                  <div className="input-group-append">
                    <div className="btn btn-outline-dark border-left-0"> <i className="fa fa-paper-plane text-lg"></i></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 font-weight-light bg-gray-800 text-gray-300">
        <div className="container">
          <div className="row align-items-center">
            <div className="">
              <p className="text-sm mb-md-0">© 2019 Robin.  All rights reserved.</p>
            </div>
            <div className="col-md-9">
              <ul className="list-inline mb-0 mt-2 mt-md-0 text-center text-md-right">
                <li className="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/visa.svg" alt="..." className="w-2rem" /></li>
                <li className="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/mastercard.svg" alt="..." className="w-2rem" /></li>
                <li className="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/paypal.svg" alt="..." className="w-2rem" /></li>
                <li className="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/western-union.svg" alt="..." className="w-2rem" /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {openLoginModal, openSignupModal, clearNotifs, logout, clearExpiringRentals, clearMyRentals, clearWhatIWantRentals, clearRequests})(Footer)
