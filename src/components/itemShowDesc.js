import React, {Component} from 'react'
import { connect } from 'react-redux';
import ItemReview from './itemReviews';


class ItemShowDesc extends Component {
  render(){
    console.log(this.props.item);
    return(

      <div className='col-lg-8'>
        <div className='text-block'>
          <p className="text-primary"><i className='fa-map-marker-alt fa mr-1'></i> {this.props.item.city + ', ' + this.props.item.state}</p>
          <h1>{this.props.item.title}</h1>
          <p className="text-muted text-uppercase mb-4">{this.props.item.category}</p>
          <h6 className="mb-3">Item Description:</h6>
          <p className="text-muted font-weight-light">{this.props.item.description}</p>
          <hr />
          <div className="text-block">
            <p className="subtitle text-sm text-primary" style={{paddingBottom: '15px', paddingTop: '12px'}}>Owner</p>
            <div className="media"><img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/avatar/avatar-10.jpg" alt="Jack London" className="avatar avatar-lg mr-4" />
              <div className="media-body">
                <p> <span className="text-muted text-uppercase text-sm">Owned by </span><strong>{this.props.showItemOwner.name}</strong></p>
                <p className="text-muted text-sm mb-2">{this.props.showItemOwner.bio}</p>
                <p className="text-sm"><a href="/">See {this.props.showItemOwner.name}'s profile<i className="fa fa-long-arrow-alt-right ml-2"></i></a></p>
              </div>
            </div>
          </div>
          <div className="text-block">
            <p className="subtitle text-sm text-primary">Reviews</p>
            <h5 className="mb-4">Reviews </h5>
            {this.props.item.reviews.length > 0 ?
              <div>
              {this.props.item.reviews.map(review => {
                console.log(review);
                return <ItemReview review={review} userReview={review.user}/>
              })}
              <div className="py-5">
                <button type="button" data-toggle="collapse" data-target="#leaveReview" aria-expanded="false" aria-controls="leaveReview" className="btn btn-outline-primary">See All Reviews</button>
              </div>
              </div>
              :
              <h5 className="text-muted text-uppercase mb-4">Be the first to rent and review!</h5>
            }
            <hr />
          </div>
        </div>
      </div>
    )
  }
}

  const mapStateToProps = state => {
    return {
      item: state.showItem,
      showItemOwner: state.showItemOwner
    }
  }

export default connect(mapStateToProps)(ItemShowDesc)

//
// <form id="contact-form" method="get" action="#" class="form">
// <div class="row">
// <div class="col-sm-6">
// <div class="form-group">
// <label for="name" class="form-label">Your name *</label>
// <input type="text" name="name" id="name" placeholder="Enter your name" required="required" class="form-control">
// </div>
// </div>
// <div class="col-sm-6">
// <div class="form-group">
// <label for="rating" class="form-label">Your rating *</label>
// <select name="rating" id="rating" class="custom-select focus-shadow-0">
// <option value="5">★★★★★ (5/5)</option>
// <option value="4">★★★★☆ (4/5)</option>
// <option value="3">★★★☆☆ (3/5)</option>
// <option value="2">★★☆☆☆ (2/5)</option>
// <option value="1">★☆☆☆☆ (1/5)</option>
// </select>
// </div>
// </div>
// </div>
// <div class="form-group">
// <label for="email" class="form-label">Your email *</label>
// <input type="email" name="email" id="email" placeholder="Enter your  email" required="required" class="form-control">
// </div>
// <div class="form-group">
// <label for="review" class="form-label">Review text *</label>
// <textarea rows="4" name="review" id="review" placeholder="Enter your review" required="required" class="form-control"></textarea>
// </div>
// <button type="submit" class="btn btn-primary">Post review</button>
// </form>
