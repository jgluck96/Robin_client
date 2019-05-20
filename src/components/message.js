import React, {Component} from 'react'
// import {itemShow} from '../actions/items'
import {connect} from 'react-redux'
import {openReviewModal} from '../actions/modal'
import {withRouter} from 'react-router'

class Message extends Component {

  show = item => {
    localStorage.setItem("currentItem", JSON.stringify(item))
    this.props.itemShow(item)
    this.props.history.push(`/item-show/${item.id}`)
  }

  openReview = (item) => {
    this.props.openReviewModal(item)
    document.getElementById('root').setAttribute('class', 'modal-overflow')
  }

  deleteRentNotif = (rentalId, rental) => {
    this.props.remove(rental)
    fetch(`http://localhost:3000/rentals/${rentalId}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        read: true
      })
    })
  }

  deleteReqNotif = (requestId, request) => {
    this.props.remove(request)
    fetch(`http://localhost:3000/requests/${requestId}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        read: true
      })
    })
  }

  render(){
    return(
      <React.Fragment>
      {
        this.props.rental ?

        this.props.rental.status === 'expiring' ?
              <div style={{width:'100%', border: '1px solid #c5c5c5', backgroundColor: 'rgba(192,192,192,0.3)'}}>
                <span onClick={() => this.deleteRentNotif(this.props.rental.id, this.props.rental)} style={{float: "right", paddingRight: '15px', cursor: 'pointer', margin: '10px', fontSize: '25px'}}>x</span><p style={{margin: '20px'}}>Make sure to return your rental for <a style={{fontWeight: 'bold', color: '#4629d3'}} onClick={() => this.show(this.props.item)} href={'/item-show/' + this.props.item.id}>{this.props.item.title}</a> within the next 2 hours!</p>
              </div>
              :
              <div style={{width:'100%', border: '1px solid #c5c5c5', backgroundColor: 'rgba(192,192,192,0.3)'}}>
                <span onClick={() => this.deleteRentNotif(this.props.rental.id, this.props.rental)} style={{float: "right", paddingRight: '15px', margin: '10px', cursor: 'pointer', fontSize: '25px'}}>x</span><p style={{margin: '20px'}}>Don't forget to <span onClick={() => this.openReview(this.props.item)} style={{color: '#4629d3', cursor: 'pointer', fontWeight: 'bold'}}>rate</span> your recent rental for <span style={{fontWeight: 'bold', color: '#4629d3', cursor: 'default'}}>{this.props.item.title}</span>!</p>
              </div>

        :
          <div style={{width:'100%', border: '1px solid #c5c5c5', backgroundColor: 'rgba(192,192,192,0.3)'}}>
               <span onClick={() => this.deleteReqNotif(this.props.request.id, this.props.notif)} style={{float: "right", paddingRight: '15px', cursor: 'pointer', margin: '10px', fontSize: '25px'}}>x</span><p style={{margin: '20px'}}>You have a new rental request for <a style={{fontWeight: 'bold', color: '#4629d3'}} onClick={() => this.show(this.props.item)} href={'/item-show/' + this.props.item.id}>{this.props.item.title}</a></p>
               </div>


      }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    requests: state.requests,
    notifs: state.falseNotifs,
    whatIWant: state.whatIWant
  }
}

export default withRouter(connect(mapStateToProps, {openReviewModal})(Message))
