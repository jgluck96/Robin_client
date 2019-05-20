import React, {Component} from 'react'
import $ from "jquery"
import { slide as Menu } from "react-burger-menu";


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
    $('#collshow').toggleClass("show")
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

    </React.Fragment >

  );


}
