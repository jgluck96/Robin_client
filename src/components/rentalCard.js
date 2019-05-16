import React, {Component} from 'react'
// import {withRouter} from 'react-router'
// import {itemShow} from '../actions/items'

import {connect} from 'react-redux'
import RentalTimer from './rentalTimer'


class RentalCard extends Component {


  // countDownDate = new Date(this.props.request.request.date_end).getTime();


render(){
  return(
    <div className="col-sm-6 mb-4">
      <div style={{width: '200%', padding: '8px'}} className="card h-100 border-0 shadow">
        <h5>Requested item: {this.props.item.title}</h5>
        <div>Requested by: <span style={{float: 'right'}}>{this.props.requester.name}</span></div>
        <div>Time left: <span style={{float: 'right'}}>{new Date(this.props.request.request.date_start) <= new Date() ? (<RentalTimer endDate={this.props.request.request.date_end} id={this.props.request.request.id}/>) : 'Not Started'}</span></div>
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

export default connect(mapStateToProps)(RentalCard)
// <p>Time left: <span id='countdown'>{new Date(this.props.request.request.date_start) <= new Date() ? this.countDown : 'Rental has yet to begin'}</span></p>


// <p>Time left: <span id='countdown'>{this.props.request.request.date_start <= new Date() ? 'Rental has yet to begin' : this.countDown}</span></p>

// <p>Time left: <span id='countdown'>{this.props.request.request.date_start <= new Date() ? 'Rental has yet to begin' : this.distance < 0 ? clearInterval(setInterval(this.countDown, 1000)) : setInterval(this.countDown, 1000)}</span></p>
