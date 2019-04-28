import React, {Component} from 'react'
import $ from "jquery"
import { slide as Menu } from "react-burger-menu";

// 
//   state = {
//     menuOpen: false
//   }
//
//   handleStateChange = (state) => {
//     this.setState({menuOpen: state.isOpen})
//   }
//
//   closeMenu = () => {
//   this.setState({menuOpen: false})
// }

const toggleMenu = () => {
    // this.setState({menuOpen: !this.state.menuOpen})
    $(".icon").toggleClass("close")
  }





    export default props => {
  return (
    <React.Fragment >
    <div onClick={() => toggleMenu()} id="wrapper">
    <div className='circle icon'>
    <span className="line top"></span>
    <span className="line middle"></span>
    <span className="line bottom"></span>
    </div>
    </div>
    <Menu >
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/burgers">
        Burgers
      </a>

      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>

      <a className="menu-item" href="/desserts">
        Desserts
      </a>
    </Menu>
    </React.Fragment >

  );


}
