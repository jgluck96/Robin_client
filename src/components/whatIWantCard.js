import React, {Component} from 'react'
// import {withRouter} from 'react-router'
// import {itemShow} from '../actions/items'

import {connect} from 'react-redux'
// import RentalTimer from './rentalTimer'


class WhatIWantCard extends Component {


  // countDownDate = new Date(this.props.request.request.date_end).getTime();


render(){
  return(
    <div  className="col-sm-6 mb-4">
      <div style={this.props.whatIWant.request.accepted === false ? {opacity: '0.3', backgroundColor: 'grey', cursor: 'default', width: '200%', padding: '8px'} : {cursor: 'default', width: '200%', padding: '8px'}} className="card h-100 border-0 shadow">
        <h5>Requested item: {this.props.item.title}</h5>
        <div>Owner: <span style={{float: 'right'}}>{this.props.owner.name}</span></div>
        <div>Start Date: <span style={{float: 'right'}}>{new Date(this.props.whatIWant.request.date_start).toDateString() + ' ' + new Date(this.props.whatIWant.request.date_start).toLocaleTimeString()}</span></div>
        <div>End Date: <span style={{float: 'right'}}>{new Date(this.props.whatIWant.request.date_end).toDateString() + ' ' + new Date(this.props.whatIWant.request.date_end).toLocaleTimeString()}</span></div>
        <div style={{paddingRight: '5px'}}>Status: <span style={{float: 'right'}}> {this.props.whatIWant.request.accepted === null ? 'pending' : this.props.whatIWant.request.accepted === true ? 'approved' : 'denied'}</span></div>
      </div>
    </div>
  )
}
}

const mapStateToProps = state => {
  return {
    requests: state.requests
  }
}

export default connect(mapStateToProps)(WhatIWantCard)
