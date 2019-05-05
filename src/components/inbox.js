import React, {Component} from 'react'
import Message from './message'
import {connect} from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider'

// <ActionCableConsumer
// channel={{channel: 'FeedChannel'}}
// onReceived={() => {
//   console.log('message Received')
// }}
// />

class Inbox extends Component {
  render(){
    return(
      <div style={{margin: '100px'}}>
        {
          this.props.requests.map(req => {
            return <Message requester={req.request.requester} item={req.itemObj}/>
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    requests: state.requests
  }
}

export default connect(mapStateToProps)(Inbox)
