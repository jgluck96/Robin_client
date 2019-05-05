import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import NavBar from './components/navBar'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import Home from './pages/home'
import ListItem from './pages/listItem'
import AccountPage from './pages/accountPage'
import ItemShowPage from './pages/itemShowPage'
import AllItems from './pages/browseAll'
import SignUp from './components/signup'
import LogIn from './components/login'
import Modal from './components/modal'
import Inbox from './components/inbox'
import { autoLogin } from './actions/users'
import { fetchRequests } from './actions/requests'
import {connect} from 'react-redux'
import { fetchMyRentals } from './actions/rentals'
import { userGeo } from './actions/geolocation'


class App extends Component {

  componentDidMount() {

    navigator.geolocation.getCurrentPosition((position) => {
      this.props.userGeo({lat: position.coords.latitude, lng: position.coords.longitude})
    })

    if (localStorage.getItem('token')) {
      this.props.autoLogin()
      setTimeout(() => {
        this.props.fetchRequests(this.props.user.id)
        this.props.fetchMyRentals(this.props.user.id)
      }
      , 1000)
    }
  }

  // componentDidUpdate(){
  //   console.log('in nav cdm');
  // }



  render(){
    return (
        <React.Fragment >
          <NavBar />
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/create-listing' component={ListItem} />
              <Route exact path='/browse-all' component={AllItems} />

              <Route exact path='/log-out' component={Home} />
              <Route exact path='/item-show' component={ItemShowPage} />
              <Route exact path='/account' component={AccountPage} />
              <Route exact path='/inbox' component={Inbox} />
            </Switch>
            {this.props.loginModal ?
              <React.Fragment>
              <Modal>
                <LogIn />
              </Modal>
              </React.Fragment>
              :
              null
            }
            {this.props.signupModal ?
              <React.Fragment>
              <Modal>
                <SignUp />
              </Modal>
              </React.Fragment>
              :
              null
            }
          </div>
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    modal: state.modal,
    loginModal: state.loginModal,
    signupModal: state.signupModal,
    user: state.user
  }
}

export default connect(mapStateToProps, { autoLogin, fetchRequests, fetchMyRentals, userGeo })(App);
