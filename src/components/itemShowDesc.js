import React, {Component} from 'react'
import { connect } from 'react-redux';
import ItemReview from './itemReviews';
import "react-image-gallery/styles/css/image-gallery.css"
import ImageGallery from 'react-image-gallery';
import {Map, InfoWindow, Circle, Marker, GoogleApiWrapper} from 'google-maps-react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

class ItemShowDesc extends Component {

  state = {
    clicked: false
  }

  render(){
    const style = {
      width: '30vw',
      height: '60vh'
    }
    return(

      <div className='col-lg-8'>
        <div className='text-block'>
          <ImageGallery items={this.props.item.images.length > 0 ?
          this.props.item.images.map(img => {
            return {original: img.url, thumbnail: img.url}
          })
          :
          [{original: "https://i.ibb.co/WzbJNhP/Screen-Shot-2019-05-06-at-11-23-37-PM.png", thumbnail: "https://i.ibb.co/WzbJNhP/Screen-Shot-2019-05-06-at-11-23-37-PM.png"}]
          }
          showPlayButton={false}/>
        </div>
        <div className='text-block'>
          <p className="text-primary"><i className='fa-map-marker-alt fa mr-1'></i> {this.props.item.city + ', ' + this.props.item.state}</p>
          <h1>{this.props.item.title}</h1>
          <p className="text-muted text-uppercase mb-4">{this.props.item.category}</p>
          <h6 className="mb-3">Item Description:</h6>
          <p className="text-muted font-weight-light">{this.props.item.description}</p>
          <hr />
          <div className="text-block">
            <p className="subtitle text-sm text-primary" style={{paddingBottom: '15px', paddingTop: '12px'}}>Owner</p>
            <div className="media"><img src={this.props.showItemOwner.img} alt="" className="avatar avatar-lg mr-4" />
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
              (this.state.clicked ?
                <PerfectScrollbar style={{height: '550px'}}>
                <div>
                  {this.props.item.reviews.map(review => {
                    return <ItemReview review={review} userReview={review.user}/>
                  })}
                </div>
                </PerfectScrollbar>
              :
              <div>
              {this.props.item.reviews.slice(0,3).map(review => {
                return <ItemReview review={review} userReview={review.user}/>
              })}
                <div className="py-5">
                  <button onClick={() => this.setState({clicked: true})} type="button" className="btn btn-outline-primary">See All Reviews</button>
                </div>
              </div> )
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

  // export default GoogleApiWrapper({
  //   apiKey: 'AIzaSyAoWjEeNWpF5PuTdxlaBj3Mx3h9Qtfp24w'
  // })(Container)


export default connect(mapStateToProps)(ItemShowDesc)

// <div className="text-block">
// <div className={style}>
// <Map
// initialCenter={{lat: this.props.item.lat, lng: this.props.item.lng}}
// google={this.props.google}
// style={{width: 500, height: 500, position: 'relative'}}
// zoom={14}
// >
// <Circle
// radius={1200}
// center={{lat: this.props.item.lat, lng: this.props.item.lng}}
// strokeColor='transparent'
// strokeOpacity={0}
// strokeWeight={5}
// fillColor='#FF0000'
// fillOpacity={0.2}
// />
// </Map>
// </div>
// </div>
