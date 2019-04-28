import React, {Component} from 'react'
import { NavLink } from "react-router-dom";
import ReactDOM from 'react-dom'
import MobileBtn from './mobileBtn'


export default class NavBar extends Component {
  render(){
    return(
      <div>
        <nav className="navbar navbar-expand-lg fixed-top shadow navbar-light bg-white">
          <div className="container-fluid">
            <div >
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
                      <NavLink className="nav-link" to='/browse-all'>
                          Browse All
                      </NavLink>
                    </li>
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
                    <li className='nav-item'>
                      <NavLink className="nav-link" to='/account'>
                        Account
                      </NavLink>
                    </li>
                    <li className='nav-item'>
                      <div>
                        <NavLink className="nav-link" to='/create-listing'>
                          ADD LISTING
                        </NavLink>
                        </div>
                    </li>
                  </ul>
                  </div>
        </nav>
      </div>
    )
  }
}








// <MobileBtn pageWrapId={"page-wrap"}/></div>
