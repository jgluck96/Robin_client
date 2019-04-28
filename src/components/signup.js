import React, {Component} from 'react'

export default class Signup extends Component {
  render(){
    return(
      <div>
        <form>
        <input placeholder='name' type="text">
        </input>
         <input placeholder='email' type="text">
         </input>
         <input placeholder='password' type="text">
         </input>
         <button type='submit'>Sign up</button>
        </form>
      </div>
    )
  }
}
