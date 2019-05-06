import React, {Component} from 'react'
import { connect } from 'react-redux';
import ShowRR from './itemShowRR'
import ShowDesc from './itemShowDesc'
import {itemShow} from '../actions/items'
import MyItemsSlider from './myItemsSlider'


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
      <MyItemsSlider items={this.props.showItemOwnerItems}/>
      </div>
    )
  }
}

  const mapStateToProps = state => {
    return {
      item: state.showItem,
      showItemOwner: state.showItemOwner,
      showItemOwnerItems: state.showItemOwnerItems
    }
  }

export default connect(mapStateToProps, {itemShow})(ItemShow)
