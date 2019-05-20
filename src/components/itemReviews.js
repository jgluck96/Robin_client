import React, {Component} from 'react'
// import { connect } from 'react-redux';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

class ItemReview extends Component {


  rating = (n) => {
    if (n === 1) {
      return <i className="fa fa-xs fa-star text-primary"></i>
    } else {
      return [<i className="fa fa-xs fa-star text-primary"></i>, this.rating(n - 1)]
    }
  }

  render(){
    return(
      <div className="media d-block d-sm-flex review">
        <div className="text-md-center mr-4 mr-xl-5"><img src={this.props.userReview.img} alt="" className="d-block avatar avatar-xl p-2 mb-2" />
          <span className="text-uppercase text-muted text-sm">{monthNames[new Date(this.props.review.created_at).getMonth()] + ' ' + new Date(this.props.review.created_at).getFullYear()}</span>
        </div>
        <div className="media-body">
          <h6 className="mt-2 mb-1">{this.props.userReview.name}</h6>
          <div className="mb-2">
          {
            this.rating(parseInt(this.props.review.rating))
          }
          </div>
          <p className="text-muted text-sm">{this.props.review.comment}</p>
        </div>
      </div>
    )
  }
}


export default ItemReview
