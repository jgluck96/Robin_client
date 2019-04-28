import React, {Component} from 'react'
import { connect } from 'react-redux';

class RentalTotal extends Component {
  render(){
    return(
      <div>
        <div>${this.props.item.rental_price} x days:</div>
        <div>Service Fee:</div>
          <hr class="my-4"/>
        <div>Total Price:</div>

      </div>
    )
  }
}

  const mapStateToProps = state => {
    return {
      item: state.showItem
    }
  }

export default connect(mapStateToProps)(RentalTotal)
