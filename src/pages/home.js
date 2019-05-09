import React, {Component} from 'react'
import HomeSearch from '../components/homeSearch'
import EasyBookingSection from '../components/easyBookingSection'
import BackgroundHome from '../components/backgroundHome'

export default class Home extends Component {
  render(){
    return(
      <React.Fragment>
        <section className='hero-home'>
          <BackgroundHome />
          <HomeSearch />
        </section>
        <EasyBookingSection />
      </React.Fragment>
    )
  }
}
