import React, {Component} from 'react'

export default class Inbox extends Component {

  countDown = setInterval(() => {
    const countDownDate = new Date(this.props.endDate).getTime();

    const now = new Date().getTime();
    const distance =  countDownDate - now;

  // Update the count down every 1 second


    // Get todays date and time
    // Find the distance between now and the count down date
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (document.getElementById(`${this.props.id.toString()}`)) {
      document.getElementById(`${this.props.id.toString()}`).innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";
      if (distance < 0) {
        clearInterval(this.countDown);
        document.getElementById(`${this.props.id.toString()}`).innerHTML = "EXPIRED";
      }
    }
  }, 1000)

  render(){
    return(
      <div>
      <span id={this.props.id.toString()}>{this.countDown}</span>
      </div>
    )
  }
}
