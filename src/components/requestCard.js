import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {itemShow} from '../actions/items'

import {requestDenied} from '../actions/requests'
import {requestAccepted} from '../actions/requests'
import {fetchRequests} from '../actions/requests'
import {fetchWhatIWant} from '../actions/requests'

import {connect} from 'react-redux'


class RequestCard extends Component {


  submitRental = (e) => {
    e.preventDefault()
      const findRequest = this.props.requests[this.props.id]

    fetch('http://localhost:3000/rentals', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        user_id: findRequest.requesterObj.id,
        item_id: findRequest.itemObj.id,
        date_start: findRequest.request.date_start,
        date_end: findRequest.request.date_end,
        days_rented: findRequest.request.days_rented,
        subtotal: findRequest.request.subtotal,
        service_fee: findRequest.request.service_fee,
        total_price: findRequest.request.total_price
      })
    })
    .then(resp => resp.json())
    .then(
    this.props.requestAccepted(findRequest.request.id, this.props.user.id)
    )
    .then(this.props.fetchWhatIWant(this.props.user.id))
  }

  render(){
    const findRequest = this.props.requests[this.props.id]

    return(

      <div className="col-sm-6 mb-5">
        <div className="card h-100 border-0 shadow">
          <h3>Requested item: {this.props.item.title}</h3>
          <p>Requested by: {this.props.requester.name}</p>
        </div>
        <button onClick={this.submitRental}>Accept</button>
        <button onClick={() => {
         this.props.requestDenied(findRequest.request.id, this.props.user.id)
         setTimeout(() => this.props.fetchWhatIWant(this.props.user.id), 500)
          }
        }>Deny</button>
      </div>
    )
  }
}

  const mapStateToProps = state => {
    return {
      requests: state.requests,
      user: state.user
    }
  }

export default connect(mapStateToProps, {requestDenied, requestAccepted, fetchRequests, fetchWhatIWant})(RequestCard)
