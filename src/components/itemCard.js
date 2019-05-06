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

  rating = (n) => {

    if (n === 1) {
      return <i class="fa fa-xs fa-star text-primary"></i>
    } else {
      return [<i class="fa fa-xs fa-star text-primary"></i>, this.rating(n - 1)]
    }
  }

  render(){
    // console.log(this.props.item.reviews)

    return(
      <div className="col-sm-6 mb-5">
        <div className="card h-100 border-0 shadow" onClick={() => this.show(this.props.item)}>


        <div class="card-img-top overflow-hidden gradient-overlay">
          <img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/photo/photo-1426122402199-be02db90eb90.jpg" alt="Cute Quirky Garden apt, NYC adjacent" class="img-fluid" />
            <div class="card-img-overlay-bottom z-index-20">
              <div class="media text-white text-sm align-items-center"><img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/avatar/avatar-7.jpg" alt="John" class="avatar avatar-border-white mr-2" />
                <div class="media-body">John</div>
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


        </div>
      </div>
    )
  }
}

export default withRouter(connect(null, {itemShow})(ItemCard))
