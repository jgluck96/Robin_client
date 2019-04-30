import React, {Component} from 'react'
import ItemShowContainer from '../components/itemShow'

export default class ItemShowPage extends Component {


  render(){
    return(
      <div style={{top: '100px', position:'relative'}}>
        <div className='container py-5'>
            <ItemShowContainer />
        </div>
      </div>
    )
  }
}
