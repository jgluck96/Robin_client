import React, {Component} from 'react'
// import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import {itemShow} from '../actions/items'
// import {showItemOwner} from '../actions/items'

import {connect} from 'react-redux'


class ItemCard extends Component {

  show = item => {
    localStorage.setItem("currentItem", JSON.stringify(item))
    this.props.itemShow(item)
    // this.props.showItemOwner(item)
    this.props.history.push('/item-show')
  }

  render(){
    return(
      <div className="col-sm-6 mb-5">
        <div className="card h-100 border-0 shadow" onClick={() => this.show(this.props.item)}>
          <h3>{this.props.title}</h3>
          <h5>{this.props.description}</h5>
          <p>{this.props.category}</p>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(null, {itemShow})(ItemCard))
