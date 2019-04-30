import React, {Component} from 'react'
import { connect } from 'react-redux';
import Demo from './geoloc'

class Account extends Component {
  render(){
    return(


      <div>
      <Demo />
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
    user: state.user
  }
}

export default connect(mapStateToProps)(Account)
