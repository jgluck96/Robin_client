import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { closeModal } from '../actions/modal'
import {connect} from 'react-redux'



const portalRoot = document.getElementById('portal')
class Modal extends Component {
  constructor() {
    super()
    this.el = document.createElement('div')
  }

  componentDidMount() {
    portalRoot.appendChild(this.el)
  }
  componentWillUnmount() {
    portalRoot.removeChild(this.el)
  }

  // style={{
  //   position: 'absolute',
  //   top: '0',
  //   bottom: '0',
  //   left: '0',
  //   display: 'grid',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.3)'
  // }}

  // style={{
  //   padding: 20,
  //   background: '#fff',
  //   borderRadius: '2px',
  //   display: 'inline-block',
  //   minHeight: '300px',
  //   margin: '1rem',
  //   position: 'relative',
  //   minwidth: '300px',
  //   boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
  //   justifySelf: 'center'
  // }}
  render() {
    return ReactDOM.createPortal(
      <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        maxHeight: '100%',
        zIndex: '1010'
      }}
      onClick={this.props.onClose}
      >
        <div
        style={{
          padding: 20,
          background: '#fff',
          borderRadius: '2px',
          display: 'inline-block',
          minHeight: '300px',
          margin: '1rem',
          position: 'relative',
          minwidth: '300px',
          boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
          justifySelf: 'center'
        }}
        >
          {this.props.children}
          <hr />
          <button onClick={() => this.props.closeModal()}>x</button>
        </div>
      </div>,
      portalRoot,
    )
  }
}

export default connect(null, {closeModal})(Modal)
