import React, {Component} from "react";
import DatePicker from "react-datepicker";
import {connect} from 'react-redux'
import Modal from './modal'
import { openModal, closeModal } from '../actions/modal'
import { itemShow } from '../actions/items'

import "react-datepicker/dist/react-datepicker.css";



class RentalTotal extends Component {

  state = {
      startDate: '',
      endDate: '',
      formattedStart: '',
      formattedEnd: '',
      days: 0,
      subtotal: '0.00',
      service_fee: '0.00',
      total: '0.00'

    };



  handleChangeStart = (date) => {

    const startDate = this.formatDate(date)
    this.setState({
      startDate: date,
      formattedStart: startDate,
      endDate: '',
      days: 0,
      subtotal: '0.00',
      service_fee: '0.00',
      total: '0.00'
    })
  }

  formatDate = date => {
    if (date) {
      const endDate = date
      var dd = endDate.getDate();
      var mm = endDate.getMonth() + 1;

      var yyyy = endDate.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
    }
    return mm + '/' + dd + '/' + yyyy
  }

  handleChangeEnd = (date) => {

    if(!this.state.startDate) {

      const startDate = this.formatDate(date)
      this.setState({
        startDate: date,
        formattedStart: startDate
      })
    } else {

      const endDate = this.formatDate(date)
      if (endDate !== this.state.formattedStart) {

        this.setState({
          endDate: date,
          formattedEnd: endDate,
        }, () => {
          const dt1 = new Date(this.state.formattedStart);
          const dt2 = new Date(this.state.formattedEnd);
          const days = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24))
          this.setState({
            days: days,
            subtotal: parseFloat(parseInt(this.props.item.rental_price) * parseInt(days)).toFixed(2),
            service_fee: parseFloat((parseFloat(this.props.item.rental_price).toFixed(2) * parseFloat(days)) * 0.1).toFixed(2),
            total: parseFloat((parseInt(this.props.item.rental_price) * parseInt(days)) + ((parseFloat(this.props.item.rental_price).toFixed(2) * parseFloat(days)) * 0.1)).toFixed(2)
          })
        })

      }
    }
  }

  submitRental = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/rentals', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        user_id: this.props.user.id,
        item_id: this.props.item.id,
        date_start: this.state.formattedStart,
        date_end: this.state.formattedEnd,
        days_rented: this.state.days,
        subtotal: this.state.subtotal,
        service_fee: this.state.service_fee,
        total_price: this.state.total
      })
    })
  }

  summary = (e) => {
    e.preventDefault()
    this.props.openModal()
  }


  getDateArray = (start, end) => {
      const arr = [];
      const dt = new Date(start);
      while (dt <= end) {
          arr.push(new Date(dt));
          dt.setDate(dt.getDate() + 1);
      }
      return arr;
  }

  sendRequest = () => {
    fetch('http://localhost:3000/own_items')
      .then(resp => resp.json())
      .then(ownItems => {
        const foundOwner = ownItems.find(item => item.item_id === this.props.item.id).user_id
        fetch('http://localhost:3000/requests', {
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
          },
          body: JSON.stringify({
            requester_id: this.props.user.id,
            receiver_id: foundOwner,
            item_id: this.props.item.id,
            date_start: this.state.formattedStart + ' ' + new Date().toTimeString().split(' ')[0],
            date_end: this.state.formattedEnd + ' ' + new Date().toTimeString().split(' ')[0],
            date_start_server: this.state.formattedStart + ' ' + new Date().toTimeString().split(' ')[0] + ' ' + new Date().toTimeString().split(' ')[1].slice(-5),
            date_end_server: this.state.formattedEnd + ' ' + new Date().toTimeString().split(' ')[0] + ' ' + new Date().toTimeString().split(' ')[1].slice(-5),
            days_rented: this.state.days,
            subtotal: this.state.subtotal,
            service_fee: this.state.service_fee,
            total_price: this.state.total
          })
        })
      })
      this.props.closeModal()
  }



  render() {
    const mergedDates = [].concat.apply([], this.props.item.rentals.map(rental => this.getDateArray(new Date(rental.date_start), new Date(rental.date_end))))
    return (
      <div>
      <form id="booking-form" action="#" className="form">
            <div className="flex">
              <label className="form-labelR">Beginning on:</label>
              <div className="datepicker-container datepicker-container-right">
              <DatePicker className="form-controlR"
              disableKeyboardNavigation={true}
                placeholderText="start date"
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                excludeDates={mergedDates}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
                minDate={new Date()}
              />
              </div>


              <label className="form-labelR">Ending on:</label>
              <DatePicker className="form-controlR"
                placeholderText='end date'
                selected={this.state.endDate}
                selectsEnd
                excludeDates={mergedDates}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
                minDate={this.state.startDate ? this.state.startDate : new Date()}

              />
            </div>
              <div>
                <div className='flex'>
                  <div>${this.props.item.rental_price} x {this.state.days} days:
                  <span>${this.state.subtotal}</span>
                </div>
                </div>
                <div>
                  <div>Service Fee: <span>${this.state.service_fee}</span></div>
                </div>
                    <hr className="my-4"/>
                <div>
                  <div>Total Price: <span>${this.state.total}</span></div>
                </div>
              </div>
            <div className="form-group">
              <button onClick={this.summary} type="submit" className="btn btn-primary btn-block">Request to rent</button>
            </div>
          </form>
          {this.props.modal ?
          <Modal>
            <div>
              <div>Total Price: <span>${this.state.total}</span></div>
            </div>
            <hr className="my-4"/>
            <textarea placeholder="message.."></textarea>
            <button onClick={this.sendRequest} className="btn btn-primary">send request</button>
          </Modal>
          :
          null
        }
      </div>
    )
  }
}

  const mapStateToProps = state => {
    return {
      item: state.showItem,
      items: state.items,
      user: state.user,
      modal: state.requestModal
    }
  }

export default connect(mapStateToProps, {openModal, itemShow, closeModal})(RentalTotal)
