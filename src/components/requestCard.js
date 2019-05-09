import React, {Component} from 'react'
// import {withRouter} from 'react-router'
// import {itemShow} from '../actions/items'

import {requestDenied} from '../actions/requests'
import {requestAccepted} from '../actions/requests'
import {fetchRequests} from '../actions/requests'
import {fetchWhatIWant} from '../actions/requests'
import {login} from '../actions/users'

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
        date_start_server: findRequest.request.date_start_server,
        date_end_server: findRequest.request.date_end_server,
        days_rented: findRequest.request.days_rented,
        subtotal: findRequest.request.subtotal,
        service_fee: findRequest.request.service_fee,
        total_price: findRequest.request.total_price,
        status: null,
        read: null
      })
    })
    .then(resp => resp.json())
    .then(
    this.props.requestAccepted(findRequest.request.id, this.props.user.id)
    )
    .then(this.props.fetchWhatIWant(this.props.user.id))
    .then(() => {
      console.log(this.props.user.funds + findRequest.request.subtotal)
      fetch(`http://localhost:3000/users/${this.props.user.id}`,{
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          funds: this.props.user.funds + findRequest.request.subtotal
        })
      })
      .then(resp => resp.json())
      .then(user => this.props.login(user))
    })
  }

  render(){
    const findRequest = this.props.requests[this.props.id]

    return(

      <div className="col-sm-6 mb-5">
        <div style={{width: '200%'}} className="card h-100 border-0 shadow">
          <h5>Requested item: {this.props.item.title}</h5>
          <p>Requested by: <span style={{float: 'right'}}>{this.props.requester.name}</span></p>
          <div style={{marginLeft: '10px'}} className="row">
            <button style={{width: '20%', margin: '5px'}} className="btn btn-primary" onClick={this.submitRental}>Accept</button>
            <button style={{margin: '5px', backgroundColor: 'grey', color: 'white', width: '20%'}} className="btn" onClick={() => {
              this.props.requestDenied(findRequest.request.id, this.props.user.id)
              setTimeout(() => this.props.fetchWhatIWant(this.props.user.id), 500)
              }
            }>Deny</button>
          </div>
        </div>
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

export default connect(mapStateToProps, {requestDenied, login, requestAccepted, fetchRequests, fetchWhatIWant})(RequestCard)
