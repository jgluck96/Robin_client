import React, { Fragment } from 'react';

class Demo extends React.Component {
  state = {
    lat: 0,
    long: 0
  }

  componentDidMount() {
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({lat: position.coords.latitude})
      })}

  }

  lat = navigator.geolocation.getCurrentPosition(position => {
    return position.coords.latitude})

  render() {
    return (
      <Fragment>
      <h1>Anything</h1>
        <h1>{await this.lat}</h1>
        <h1>{this.state.long}</h1>
      </Fragment>
    )
  }
}

export default Demo;
