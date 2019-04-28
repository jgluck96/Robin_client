import React, {Component} from 'react'
import { connect } from 'react-redux';
import RentalForm from './rentalForm'


class ItemShowRR extends Component {
  render(){
    return(
      <div className='col-lg-4'>
        <div className='p-4 shadow ml-lg-4 rounded sticky-top'>
          <p className="text-muted">
            <span className="text-primary h2">${this.props.item.rental_price}</span> per day
          </p>
          <hr className="my-4"/>
              <RentalForm />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    item: state.showItem
  }
}

export default connect(mapStateToProps)(ItemShowRR)
