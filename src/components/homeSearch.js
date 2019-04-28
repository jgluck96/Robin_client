import React, {Component} from 'react'

export default class homeSearch extends Component {
  render(){
    return(
<div className="container py-6 py-md-7 text-white z-index-20">
  <div className="row">
    <div className="col-xl-10">
      <div className='search-bar mt-5 p-3 p-lg-1 pl-lg-4'>
        <form>
          <div className='row'>
            <div className="col-lg-4 d-flex align-items-center form-group">
             <input className="form-control border-0 shadow-0" placeholder='what do you want?' type="text">
             </input>
            </div>
            <div className="col-lg-3 d-flex align-items-center form-group">
              <div className="input-label-absolute input-label-absolute-right w-100">
               <input id="location" className="form-control border-0 shadow-0" placeholder='location'>
               </input>
             </div>
            </div>
            <div className="col-lg-3 d-flex align-items-center form-group no-divider">
              <div >
                <select className="btn dropdown-toggle bs-placeholder btn-form-control" title="Categories">
                  <option value>Categories...</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Sports & Outdoors">Sports & Outdoors</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2">
              <button className="btn btn-primary btn-block rounded-xl h-100" type='submit'>Search</button>
            </div>
         </div>
        </form>
      </div>
    </div>
  </div>
</div>
    )
  }
}



// <button type="button" data-toggle="dropdown" className="btn dropdown-toggle bs-placeholder btn-form-control">
// <div className="filter-option">
// <div className="filter-option-inner">
// <div className="filter-option-inner-inner">Categories
//
// </div>
// </div>
// </div>
// </button>
