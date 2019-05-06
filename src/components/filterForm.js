import React, {Component} from 'react'

class FilterForm extends Component {
  render(){
    return(
      <React.Fragment>
      <h2 className="mb-4">Rent in Manhattan, NY</h2>
      <hr className="my-4"/>
      <form action="#" autoComplete="off">
        <div className="row">
            <div className="col-xl-4 col-md-6 mb-4">
              <label  className="form-label">Dates</label>
              <div className="datepicker-container datepicker-container-left">
                <input type="text" name="bookingDate" id="form_dates" placeholder="Choose your dates" className="form-control" />
              </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4">
              <label  className="form-label">Location</label>
              <div className="dropdown bootstrap-select form-control">
              <select name="guests" id="form_guests" data-style="btn-selectpicker" title=" " className="selectpicker form-control" tabIndex="-98">
              </select>
              <button type="button" className="btn dropdown-toggle bs-placeholder btn-selectpicker" data-toggle="dropdown" data-id="form_guests" title="">
              <div className="filter-option">
              <div className="filter-option-inner">
              <div className="filter-option-inner-inner">
              </div>
              </div>
              </div>
              </button>
              <div className="dropdown-menu " >
              <div className="inner show" aria-expanded="false" tabIndex="-1">
              <ul className="dropdown-menu inner show">
              </ul></div></div></div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4">
              <label  className="form-label">Category</label>
              <div className="dropdown bootstrap-select show-tick form-control">
              <select name="type" id="form_type" multiple="" data-style="btn-selectpicker" title="" className="selectpicker form-control" tabIndex="-98">
              </select>
              <button type="button" className="btn dropdown-toggle bs-placeholder btn-selectpicker" data-toggle="dropdown" data-id="form_type" title=""><div className="filter-option"><div className="filter-option-inner"><div className="filter-option-inner-inner"></div></div> </div></button><div className="dropdown-menu "><div className="inner show" aria-expanded="false" tabIndex="-1"><ul className="dropdown-menu inner show"></ul></div></div></div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4">
            {// price range
            }
            </div>
            </div>
          <div className="row">
            <div className="col-sm-6 mb-4 order-2 order-sm-1">
              <button type="submit" className="btn btn-primary"> <i className="fas fa-search mr-1"></i>Search</button>
            </div>
          </div>
        </form>
        </React.Fragment>
    )
  }
}

export default FilterForm
