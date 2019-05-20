import React, {Component} from 'react'
import Message from './message'
import {connect} from 'react-redux'
// import { ActionCableConsumer } from 'react-actioncable-provider'
import Loading from 'react-loading-components';
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {withRouter} from 'react-router'
import Footer from './footer'
// <ActionCableConsumer
// channel={{channel: 'FeedChannel'}}
// onReceived={() => {
//   console.log('message Received')
// }}
// />


class Inbox extends Component {
  state = {
    falseStuff: ''
  }

  show = item => {
    localStorage.setItem("currentItem", JSON.stringify(item))
    this.props.itemShow(item)
    this.props.history.push(`/item-show/${item.id}`)
  }

  deleteNotif = (requestId, request) => {
    this.remove(request)
    fetch(`http://localhost:3000/requests/${requestId}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        read: true
      })
    })
  }

  remove = (data) => {
    const found = this.state.falseStuff.find(obj => obj === data)
    const idx = this.state.falseStuff.indexOf(found)
    const state = this.state.falseStuff
    state.splice(idx, 1)
      this.setState({
        falseStuff: state
      })
  }



  render(){
    if (this.props.notifs) {
      const falseStuff = [].concat.apply([], [this.props.notifs.falseReadRequests, this.props.notifs.falseReadRentals, this.props.notifs.falseReadAndExpiredRentals, this.props.notifs.falseWhatIWant])
      if (!this.state.falseStuff) {
        this.setState({falseStuff: falseStuff})
      }
    }
    return(
      <div >
      <label style={{fontSize: '20px', top: '22%', left: '50px', marginTop: '15%', position: 'relative'}} className="row form-label">Notifications</label>
      {
        this.state.falseStuff ?

        <PerfectScrollbar style={{height: '300px', padding: '10px', border: '1px solid #c5c5c5', position: 'relative', width: '60%', marginTop: '5%', marginLeft: '25%', marginBottom: '9.3%'}}>

            {this.state.falseStuff.length > 0 ?
              this.state.falseStuff.map(notif => {
                if (Object.keys(notif).length === 3 && typeof (notif.requesterObj) === 'object') {
                  return <Message remove={this.remove} request={notif.request} notif={notif} requester={notif.request.requester} item={notif.itemObj}/>
                } else if (Object.keys(notif).length === 3 && typeof (notif.receiverObj) === 'object') {
                    if (notif.request.accepted) {
                      return (<div style={{width:'100%', backgroundColor: 'rgba(192,192,192,0.3)', border: '1px solid #c5c5c5'}}>
                      <span onClick={() => this.deleteNotif(notif.request.id, notif)} style={{float: "right", paddingRight: '15px', cursor: 'pointer', margin: '10px', fontSize: '25px'}}>x</span><p style={{margin: '20px'}}>Your rental request for <a style={{fontWeight: 'bold', color: '#4629d3'}} onClick={() => this.show(notif.itemObj)} href={'/item-show/' + notif.itemObj.id}>{notif.itemObj.title}</a> has been accepted!</p>
                      </div>)
                    } else {
                      return (<div style={{width:'100%', backgroundColor: 'rgba(192,192,192,0.3)',  border: '1px solid #c5c5c5'}}>
                      <span onClick={() => this.deleteNotif(notif.request.id, notif)} style={{float: "right", paddingRight: '15px', cursor: 'pointer', margin: '10px', fontSize: '25px'}}>x</span><p style={{margin: '20px'}}>Your rental request for <a style={{fontWeight: 'bold', color: '#4629d3'}} onClick={() => this.show(notif.itemObj)} href={'/item-show/'+ notif.itemObj.id}>{notif.itemObj.title}</a> was denied.</p>
                      </div>)
                    }
                } else {
                  return <Message remove={this.remove} rental={notif} item={notif.item}/>
                }
              })
              :
              <div style={{textAlign: 'center', paddingTop: '55px'}}>
                <h1>You have no notifications</h1>
                <div class="btn btn-primary mr-2 mb-2" onClick={() => this.props.history.push('./browse-all')}>Browse Listings</div>
              </div>
            }

        </PerfectScrollbar>
        :
        <div style={{display: 'block', marginTop: '12.5%', marginLeft: '50%', marginBottom: "15.5%"}}>
          <Loading style={{top: 'auto'}} type='puff' width={100} height={100} fill='#9eebfa' />
        </div>
      }
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    requests: state.requests,
    notifs: state.falseNotifs,
    whatIWant: state.whatIWant
  }
}

export default withRouter(connect(mapStateToProps)(Inbox))


// {
//   this.props.whatIWant.length > 0 ?
//   // render accepted req notif to the requester
//   this.props.whatIWant.map(whatIWant => {
//     if (!whatIWant.request.read) {
//       if (whatIWant.request.accepted) {
//         return (<div style={{width:'50%', paddingTop: '10px', backgroundColor: 'rgba(192,192,192,0.3)', borderRadius: '5px'}}>
//         <span onClick={this.deleteNotif} style={{float: "right", paddingRight: '15px', cursor: 'pointer'}}>x</span><p style={{marginLeft: '20px'}}>Your rental request for <a style={{fontWeight: 'bold', color: '#4629d3'}} onClick={() => this.show(whatIWant.itemObj)} href='/item-show'>{whatIWant.itemObj.title}</a> has been accepted!</p>
//
//         </div>)
//       } else {
//         return (<div style={{width:'50%', paddingTop: '10px', backgroundColor: 'rgba(192,192,192,0.3)', borderRadius: '5px'}}>
//         <span onClick={this.deleteNotif} style={{float: "right", paddingRight: '15px', cursor: 'pointer'}}>x</span><p style={{marginLeft: '20px'}}>Your rental request for <a style={{fontWeight: 'bold', color: '#4629d3'}} onClick={() => this.show(whatIWant.itemObj)} href='/item-show'>{whatIWant.itemObj.title}</a> was denied.</p>
//         </div>)
//       }
//     }
//   }) : null
// }
