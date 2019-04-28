import React, {Component} from 'react'
import { connect } from 'react-redux';


class ItemShowDesc extends Component {
  render(){
    return(

      <div className='col-lg-8'>
        <div className='text-block'>
        My Rentals:
        (
          1. display each rentalItemCard with a timer going down.
          2. alert(message) user to return item to lender when timer gets within 2 hours.
        )
        </div>
      </div>
    )
  }
}


export default ItemShowDesc
