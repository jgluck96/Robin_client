import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from 'react-loading-components';
import {withRouter} from 'react-router'


 class RequestSent extends Component {


  render(){
    return(
      <div style={{marginBottom: '-6.5%'}}>
      {this.props.user ?

        <section class="py-5 py-lg-6">
          <div style={{marginTop: '4%'}} class="container text-center">
            <p class="subtitle text-primary">Request sent</p>
              <h1 class="h2 mb-5"> Chill out, you will hear back shortly</h1>
            <p class="mb-5"><img src="https://digitalagencyrankings.com/wp-content/uploads/2018/10/undraw_hang_out_h9ud.png" alt="" style={{width: "400px"}} class="img-fluid" /></p>
            <p class="text-muted mb-5">Thank you, {this.props.user.name}. Your request has been sent!</p>
            <p class="mb-5">
              <div style={{cursor: 'pointer'}} class="btn btn-primary mr-2 mb-2" onClick={() => this.props.history.push('./browse-all')}>Browse Listings</div>
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
    user: state.user
  }
}
export default withRouter(connect(mapStateToProps)(RequestSent))
