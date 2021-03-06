import React, {Component} from 'react'
import { connect } from 'react-redux';
import {fetchRequests} from '../actions/requests'
import {fetchWhatIWant} from '../actions/requests'
import {autoLogin} from '../actions/users'
// import {openLoginModal} from '../actions/users'
import RequestCard from './requestCard'
import RentalCard from './rentalCard'
import WhatIWantCard from './whatIWantCard'
import Loading from 'react-loading-components';
// import Avatar from 'react-avatar-edit'
import Uploader from './Uploader';
// import uploadcare from "uploadcare-widget"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import {withRouter} from 'react-router'
// import {Redirect} from 'react-router-dom'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

class Account extends Component {


    // src = './example/einshtein.jpg'
    state = {
      // preview: null,
      img: '',
      bio: '',
      clicked: false
    }

  saveBio = (e) => {
      e.preventDefault()
      if (this.state.bio !== this.props.user.bio) {
      fetch(`http://localhost:3000/users/${this.props.user.id}`, {
        method: 'PATCH',
        headers: {
          'content-type':'application/json'
        },
        body: JSON.stringify({bio: this.state.bio})
      }).then(this.setState({bio: ''})).then(window.location.reload())
    } else {
      this.setState({bio: this.props.user.bio, clicked: false})
    }
  }

  submitUserImg = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/users/${this.props.user.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({img: this.state.img})
    }).then(window.location.reload())
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render(){
    const acceptedReqs = this.props.requests.filter(req => req.request.accepted === true)
    const newReqs = this.props.requests.filter(req => req.request.accepted === null)
    return(
      <React.Fragment>
      <Tabs style={{marginTop: '120px', width: '50%', marginLeft: '50%', position: 'relative', float: 'right', zIndex: '2'}}>
        <TabList>
          <Tab>New Requests</Tab>
          <Tab>Accepted Requests</Tab>
          <Tab>My Rentals</Tab>
        </TabList>

        <TabPanel>
          <PerfectScrollbar style={{height: '500px', padding: '10px', border: '1px solid #c5c5c5', width: '97%', marginTop: '0px'}}>
          {newReqs.map(req => {
            return <RequestCard key={Math.random()} id={this.props.requests.indexOf(req)} request={req} requester={req.requesterObj} item={req.itemObj}/>
          })}
          </PerfectScrollbar>
        </TabPanel>
        <TabPanel>
          <PerfectScrollbar style={{height: '500px', padding: '10px', border: '1px solid #c5c5c5', width: '97%', marginTop: '0px'}}>
          {
            acceptedReqs.map(req => {
              return <RentalCard key={Math.random()} request={req} requester={req.requesterObj} item={req.itemObj}/>
            })
          }
          </PerfectScrollbar>
        </TabPanel>
        <TabPanel>
          <PerfectScrollbar style={{height: '500px', padding: '10px', border: '1px solid #c5c5c5', width: '97%', marginTop: '0px'}}>
          {
            this.props.whatIWant.map(whatIWant => {
              return <WhatIWantCard key={Math.random()} whatIWant={whatIWant} owner={whatIWant.receiverObj} item={whatIWant.itemObj}/>
            })
          }
          </PerfectScrollbar>
        </TabPanel>
      </Tabs>
      {this.props.user ?
        <div>
        <div style={{width: '350px', height: '450px', top: '21%', left: '10%', border: '1px solid #c5c5c5', position: 'absolute', zIndex: '2'}}>
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <div  style={{paddingTop: '35px'}}>
              <img style={{width: '200px', height: '200px', borderRadius: '50%'}} alt='' src={this.props.user.img}/>
            </div>
            <div style={{marginTop: '40px'}}>
              <Uploader
                id='file'
                name='file'
                onUploadComplete={info => {
                this.setState({img: info.cdnUrl})
                }} />
                <div style={{marginTop: '38px'}}>
                {
                  this.state.img ?
                  <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '-35px'}}>
                    <div onClick={this.submitUserImg} className="btn btn-primary">Save</div>
                  </div>
                  :
                  null
                }
                  <p className="form-label" style={{textAlign: 'center'}}>Funds: <span style={{color: 'green'}}>${this.props.user.funds}</span></p>
                  <p className="form-label" style={{textAlign: 'center'}}>Name: <span style={{color: 'black'}}>{this.props.user.name}</span></p>
                  <p className="form-label" style={{textAlign: 'center'}}>Items Owned: <span style={{color: 'black'}}>{this.props.user.items.length}</span></p>
                </div>
            </div>
          </div>
        </div>
        {this.props.user.bio ?
          this.state.clicked ?
          <div style={{width: '30%', top: '10%', left: '10%', position: 'relative', marginBottom: '10%'}} class="form-group mb-5">
            <label className="form-label">Bio</label>
            <textarea id="form_description" value={this.state.bio} rows='9' name="bio" className="form-control" onChange={this.changeHandler} placeholder='bio...'/>
            {this.state.bio ? <button onClick={this.saveBio} className="btn btn-primary">Save</button> : null}
          </div>
          :
          <div style={{width: '70%', left: '10%', position: 'relative', marginBottom: '10%'}} className="form-group mb-5">
            <label className="form-label">Bio</label>
            <div className="form-group" style={{width: '40%'}}>{this.props.user.bio}</div>
            <button  onClick={() => this.setState({bio: this.props.user.bio, clicked: true})} className="btn btn-primary">Edit</button>
          </div>
        :
        <div style={{width: '90%', top: '10%', left: '40%', position: 'relative', marginBottom: '10%'}} className="form-group mb-5">
          <label  className="form-label">Bio</label>
          <textarea id="form_description" value={this.state.bio} rows='9' name="bio" className="form-control" onChange={this.changeHandler} placeholder='bio...'/>
          {this.state.bio ? <button onClick={this.saveBio} className="btn btn-primary">Save</button> : null}
        </div>
        }
        </div>
        :
        <div style={{display: 'block', marginTop: '28%', marginLeft: '52%'}}>
          <Loading style={{top: 'auto'}} type='puff' width={100} height={100} fill='#9eebfa' />
        </div>
      }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    requests: state.requests,
    whatIWant: state.whatIWant,
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, {fetchRequests, autoLogin, fetchWhatIWant})(Account))
