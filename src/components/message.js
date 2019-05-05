import React, {Component} from 'react'
import {itemShow} from '../actions/items'

class Message extends Component {

  show = item => {
    localStorage.setItem("currentItem", JSON.stringify(item))
    this.props.itemShow(item)
  }

  render(){
    return(
      <div style={{width:'50%', paddingTop: '10px', backgroundColor: 'rgba(192,192,192,0.3)', borderRadius: '5px'}}>
        <p style={{marginLeft: '20px'}}>You have a new request for <a style={{fontWeight: 'bold'}} onClick={() => this.show(this.props.item)} href='/item-show'>{this.props.item.title}</a></p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    requests: state.requests
  }
}

export default Message
