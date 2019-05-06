import React, {Component} from 'react'
import { connect } from 'react-redux';
import {fetchRequests} from '../actions/requests'
import {fetchWhatIWant} from '../actions/requests'
import {autoLogin} from '../actions/users'
// import {openLoginModal} from '../actions/users'
import RequestCard from './requestCard'
import RentalCard from './rentalCard'
import WhatIWantCard from './whatIWantCard'
import Loading from 'react-loading-components';


class Account extends Component {

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchRequests(this.props.user.id)
      this.props.fetchWhatIWant(this.props.user.id)
    }
  }


  render(){
    const acceptedReqs = this.props.requests.filter(req => req.request.accepted === true)
    const newReqs = this.props.requests.filter(req => req.request.accepted === null)
    return(
      <React.Fragment>
      {this.props.user ?
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
        </div>
        :
        <div style={{display: 'block', marginTop: '38%', marginLeft: '52%'}}>
        <Loading style={{top: 'auto'}} type='puff' width={100} height={100} fill='#9eebfa' />
        </div>
      }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    requests: state.requests,
    whatIWant: state.whatIWant,
    user: state.user
  }
}

export default connect(mapStateToProps, {fetchRequests, autoLogin, fetchWhatIWant})(Account)
