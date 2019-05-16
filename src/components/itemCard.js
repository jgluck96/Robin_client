import React, {Component} from 'react'
// import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import {itemShow} from '../actions/items'
// import {showItemOwner} from '../actions/items'

import {connect} from 'react-redux'


class ItemCard extends Component {

  state = {
    owner: ''
  }

  show = item => {
    this.props.itemShow()

    localStorage.setItem("currentItem", JSON.stringify(item))
    this.props.itemShow(item)
    // console.log(item);
    this.props.history.push(`/item-show/${item.id}`)

    // window.location.reload();

  }

  rating = (n) => {

    if (n === 1) {
      return <i class="fa fa-xs fa-star text-primary"></i>
    } else {
      return [<i class="fa fa-xs fa-star text-primary"></i>, this.rating(n - 1)]
    }
  }


  render(){
    // console.log(this.props.item.reviews)
    (() => {
      fetch('http://localhost:3000/users')
      .then(resp => resp.json())
      .then(users => {
        const foundUser = users.find(user => user.id === this.props.item.own_items[0].user_id)
        this.setState({owner: foundUser})
      })
    })()

    return(
      <div className="col-sm-6 mb-5">
        <a className="card h-100 border-0 shadow"  href="" onClick={() => this.show(this.props.item)}>


        <div style={{height: '170px'}} class="card-img-top overflow-hidden gradient-overlay">
          <img style={{width: '100%', height: '100%'}} src={this.props.item.images.length > 0 ? this.props.item.images[0].url : "https://i.ibb.co/WzbJNhP/Screen-Shot-2019-05-06-at-11-23-37-PM.png"}/>
            <div class="card-img-overlay-bottom z-index-20">
              <div class="media text-white text-sm align-items-center"><img src={this.state.owner.img} alt="" class="avatar avatar-border-white mr-2" />
                <div style={{fontWeight: "bold"}} class="media-body">{this.state.owner.name}</div>
              </div>
            </div>
        </div>


              <div class="card-body d-flex align-items-center">
                <div class="w-100">
                  <h6 class="card-title"><a href="detail-rooms.html" class="text-decoration-none text-dark">{this.props.item.title}</a></h6>
                  <div class="d-flex card-subtitle mb-3">
                    <p class="flex-grow-1 mb-0 text-muted text-sm">{this.props.category}</p>
                    <p class="flex-shrink-1 mb-0 card-stars text-xs text-right">
                    {
                      this.props.item.reviews.length > 0 ?
                        this.rating(Math.ceil((this.props.item.reviews.map(review => review.rating).reduce((total, num) => total + num))/this.props.item.reviews.length))
                        :
                        null
                    }
                    </p>
                  </div>
                  <p class="card-text text-muted"><span class="h4 text-primary">${this.props.item.rental_price}</span> per day</p>
                </div>
              </div>
        </a>
      </div>
    )
  }
}

export default withRouter(connect(null, {itemShow})(ItemCard))
