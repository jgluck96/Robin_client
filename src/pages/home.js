import React, {Component} from 'react'
import HomeSearch from '../components/homeSearch'

export default class Home extends Component {
  render(){
    return(
      <section className='hero-home'>
      <HomeSearch />
      </section>
    )
  }
}
