import React, {Component} from 'react'
import { connect } from 'react-redux';
import ShowRR from './itemShowRR'
import ShowDesc from './itemShowDesc'
import {itemShow} from '../actions/items'


class ItemShow extends Component {

  componentDidMount() {
    if (localStorage.getItem('currentItem')) {
      console.log('here');
      this.props.itemShow(JSON.parse(localStorage.getItem('currentItem')))
    }
  }

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

export default connect(mapStateToProps, {itemShow})(ItemShow)
