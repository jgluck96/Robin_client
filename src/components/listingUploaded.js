import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from 'react-loading-components';
import {withRouter} from 'react-router'
import {itemShow} from '../actions/items'
import { fetchItems } from '../actions/items'


 class Uploaded extends Component {

   // show = item => {
   //   localStorage.setItem("currentItem", JSON.stringify(item))
   //   this.props.itemShow(item)
   //   // this.props.showItemOwner(item)
   //   this.props.history.push('/item-show')
   // }

   componentDidMount(){
     this.props.fetchItems()
   }

  render(){
    return(
      <div style={{marginBottom: '-6.5%'}}>
      {this.props.user ?

        <section class="py-5 py-lg-6">
          <div style={{marginTop: '4%'}} class="container text-center">
            <p class="subtitle text-primary">Added new listing</p>
              <h1 class="h2 mb-5"> Listing uploaded</h1>
            <p class="mb-5"><img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/illustration/undraw_celebration_0jvk.svg" alt="" style={{width: "400px"}} class="img-fluid" /></p>
            <p class="text-muted mb-5">Thank you, {this.props.user.name}. Your listing has been uploaded!</p>
            <p class="mb-5">
              <div class="btn btn-primary mr-2 mb-2" onClick={() => this.props.history.push('./browse-all')}>Browse Listings</div>
              <div class="btn btn-outline-muted mb-2" onClick={() => this.props.history.push(`./item-show/${this.props.showItem.id}`)}>Review your new listing</div>
            </p>
          </div>
        </section>
        :
        <div style={{display: 'block', marginTop: '38%', marginLeft: '52%'}}>
          <Loading style={{top: 'auto'}} type='puff' width={100} height={100} fill='#9eebfa' />
        </div>

      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    showItem: state.showItem
  }
}
export default withRouter(connect(mapStateToProps, {itemShow, fetchItems})(Uploaded))
