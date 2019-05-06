import React, {Component} from 'react'
// import {withRouter} from 'react-router'
// import {itemShow} from '../actions/items'

import {connect} from 'react-redux'
// import RentalTimer from './rentalTimer'


class WhatIWantCard extends Component {


  // countDownDate = new Date(this.props.request.request.date_end).getTime();


render(){
  return(
    <div  className="col-sm-6 mb-5">
      <div style={this.props.whatIWant.request.accepted === false ? {opacity: '0.3', cursor: 'default'} : null} className="card h-100 border-0 shadow">
        <h3>Requested item: {this.props.item.title}</h3>
        <p>Owner: {this.props.owner.name}</p>
        <div>Start Date: {new Date(this.props.whatIWant.request.date_start).toDateString() + ' ' + new Date(this.props.whatIWant.request.date_start).toLocaleTimeString()}</div>
        <div>End Date: {new Date(this.props.whatIWant.request.date_end).toDateString() + ' ' + new Date(this.props.whatIWant.request.date_end).toLocaleTimeString()}</div>
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
