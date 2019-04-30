import React, {Component} from 'react';
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
import Inbox from './components/inbox'
import { autoLogin } from './actions/users'
import {connect} from 'react-redux'

class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.autoLogin()
    }
      
  }



  render(){
    return (
        <div>
          <NavBar />
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/create-listing' component={ListItem} />
              <Route exact path='/browse-all' component={AllItems} />
              <Route exact path='/sign-up' component={SignUp} />
              <Route exact path='/sign-in' component={LogIn} />
              <Route exact path='/log-out' component={Home} />
              <Route exact path='/item-show' component={ItemShowPage} />
              <Route exact path='/account' component={AccountPage} />
              <Route exact path='/inbox' component={Inbox} />
            </Switch>
          </div>
        </div>
    )
  }
}

export default connect(null, { autoLogin })(App);
