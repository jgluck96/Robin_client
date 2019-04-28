import React, {Component} from 'react'
import ItemsContainer from '../containers/allItemsContainer'

export default class BrowseAllItems extends Component {
  render(){
    return(
      <div className="container-fluid">
      <ItemsContainer />
      </div>
    )
  }
}
