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
<footer class="position-relative fixed-bottom z-index-10">
      <div class="py-5 bg-gray-200 text-muted">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 mb-5 mb-lg-0">
              <div class="font-weight-bold text-uppercase text-dark mb-3">Directory</div>
              <p>The peer to peer rental marketplace</p>
              <ul class="list-inline">
                <li class="list-inline-item"><div target="_blank" title="twitter" class="text-muted text-hover-primary"><i class="fab fa-twitter"></i></div></li>
                <li class="list-inline-item"><div target="_blank" title="facebook" class="text-muted text-hover-primary"><i class="fab fa-facebook"></i></div></li>
                <li class="list-inline-item"><div target="_blank" title="instagram" class="text-muted text-hover-primary"><i class="fab fa-instagram"></i></div></li>
                <li class="list-inline-item"><div target="_blank" title="pinterest" class="text-muted text-hover-primary"><i class="fab fa-pinterest"></i></div></li>
                <li class="list-inline-item"><div target="_blank" title="vimeo" class="text-muted text-hover-primary"><i class="fab fa-vimeo"></i></div></li>
              </ul>
            </div>
            <div class="col-lg-2 mb-lg-0">
              <h6 class="text-uppercase text-dark mb-3">Account</h6>
              {this.props.user ?
              <ul class="list-unstyled">
                <li><a href="/account" class="text-muted">My profile</a></li>
                <li><a href="/inbox" class="text-muted">Notifications</a></li>
                <li onClick={this.logout}><a href='/' class="text-muted">Log out</a></li>
              </ul>
              :
              <ul class="list-unstyled">
                <li><div style={{cursor: 'pointer'}} onClick={this.openLogin} class="text-muted">Log in</div></li>
                <li><div style={{cursor: 'pointer'}} onClick={this.openSignup} class="text-muted">Sign up</div></li>
              </ul>
              }
            </div>
            <div class="col-lg-2 mb-lg-0">
              <h6 class="text-uppercase text-dark mb-3">Tid Bits</h6>
              <ul class="list-unstyled">
                <li><a href="/browse-all" class="text-muted">Browse items</a></li>
                <li><a target="_blank" href="https://medium.com/@joshgluck1" class="text-muted">Blog</a></li>
                <li><a href="/" class="text-muted">Home</a></li>
              </ul>
            </div>
            <div class="col-lg-4">
              <h6 class="text-uppercase text-dark mb-3">Newsletter</h6>
              <p class="mb-3"> Sign up for our newsletter to receive weekly offers and discounts</p>
              <form action="#" id="newsletter-form">
                <div class="input-group mb-3">
                  <input type="email" placeholder="Your Email Address" aria-label="Your Email Address" class="form-control bg-transparent border-dark border-right-0" />
                  <div class="input-group-append">
                    <div class="btn btn-outline-dark border-left-0"> <i class="fa fa-paper-plane text-lg"></i></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="py-4 font-weight-light bg-gray-800 text-gray-300">
        <div class="container">
          <div class="row align-items-center">
            <div class="">
              <p class="text-sm mb-md-0">© 2019 Robin.  All rights reserved.</p>
            </div>
            <div class="col-md-9">
              <ul class="list-inline mb-0 mt-2 mt-md-0 text-center text-md-right">
                <li class="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/visa.svg" alt="..." class="w-2rem" /></li>
                <li class="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/mastercard.svg" alt="..." class="w-2rem" /></li>
                <li class="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/paypal.svg" alt="..." class="w-2rem" /></li>
                <li class="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/western-union.svg" alt="..." class="w-2rem" /></li>
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
