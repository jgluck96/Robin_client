import React, {Component} from 'react'
// import { connect } from 'react-redux';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

class ItemReview extends Component {


  rating = (n) => {
    if (n === 1) {
      return <i class="fa fa-xs fa-star text-primary"></i>
    } else {
      return [<i class="fa fa-xs fa-star text-primary"></i>, this.rating(n - 1)]
    }
  }

  render(){
    console.log(this.props.review);
    return(
      <div class="media d-block d-sm-flex review">
        <div class="text-md-center mr-4 mr-xl-5"><img src={this.props.userReview.img} alt="" class="d-block avatar avatar-xl p-2 mb-2" />
          <span class="text-uppercase text-muted text-sm">{monthNames[new Date(this.props.review.created_at).getMonth()] + ' ' + new Date(this.props.review.created_at).getFullYear()}</span>
        </div>
        <div class="media-body">
          <h6 class="mt-2 mb-1">{this.props.userReview.name}</h6>
          <div class="mb-2">
          {
            this.rating(parseInt(this.props.review.rating))
          }
          </div>
          <p class="text-muted text-sm">{this.props.review.comment}</p>
        </div>
      </div>
    )
  }
}


export default ItemReview
