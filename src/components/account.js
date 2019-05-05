import React, {Component} from 'react'
import { connect } from 'react-redux';
import {fetchRequests} from '../actions/requests'
import {fetchWhatIWant} from '../actions/requests'
import {autoLogin} from '../actions/users'
import {openLoginModal} from '../actions/users'
import RequestCard from './requestCard'
import RentalCard from './rentalCard'
import WhatIWantCard from './whatIWantCard'


class Account extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.fetchRequests(this.props.user.id)
      this.props.fetchWhatIWant(this.props.user.id)
    }, 500)
  }


  render(){
    const acceptedReqs = this.props.requests.filter(req => req.request.accepted === true)
    const newReqs = this.props.requests.filter(req => req.request.accepted === null)
    return(
      <div style={{margin: '300px'}}>

      <p>Funds: ${this.props.user.funds}</p>
      <h1>my items</h1>
      requests:
      {newReqs.map(req => {
        return <RequestCard id={this.props.requests.indexOf(req)} requester={req.requesterObj} item={req.itemObj}/>
      })}
      accepted:
      {
        acceptedReqs.map(req => {
          return <RentalCard request={req} requester={req.requesterObj} item={req.itemObj}/>
        })
      }
      <h1>items i requested</h1>
      {
        this.props.whatIWant.map(whatIWant => {
          return <WhatIWantCard whatIWant={whatIWant} owner={whatIWant.receiverObj} item={whatIWant.itemObj}/>
        })
      }
        My Rentals:
        (
          1. display each rentalItemCard with a timer going down.
          2. alert(message) user to return item to lender when timer gets within 2 hours.
        )

      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    requests: state.requests,
    whatIWant: state.whatIWant,
    user: state.user
  }
}

export default connect(mapStateToProps, {fetchRequests, autoLogin, fetchWhatIWant})(Account)
