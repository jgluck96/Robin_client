import React, {Component} from 'react'

export default class Login extends Component {
  render(){
    return(
      <div>
        <form>
         <input placeholder='email' type="text">
         </input>
         <input placeholder='password' type="text">
         </input>
         <button type='submit'>Log in</button>
        </form>
      </div>
    )
  }
}
