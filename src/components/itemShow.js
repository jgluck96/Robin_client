import React, {Component} from 'react'
import { connect } from 'react-redux';
import ShowRR from './itemShowRR'
import ShowDesc from './itemShowDesc'


class ItemShow extends Component {
  render(){
    return(
      <div className='row'>
      <ShowDesc />
      <ShowRR />

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

export default connect(mapStateToProps)(ItemShow)
