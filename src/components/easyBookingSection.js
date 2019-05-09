import React, {Component} from 'react'


export default class easyBookingSection extends Component {
  render(){
    return(
    <React.Fragment>
      <section className="py-6 bg-gray-100">
        <div className="container">
          <div className="text-center pb-lg-4">
            <p className="subtitle text-secondary">One-of-a-kind rentals </p>
            <h2 className="mb-5">Renting with us is easy</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-3 mb-lg-0 text-center">
              <div className="px-0 px-lg-3">
                <div className="icon-rounded bg-primary-light mb-3">
                    <i style={{fontSize: '35px', color: 'grey', paddingTop: '13px'}} className="fas fa-map-marked-alt"></i>

                </div>
                <h3 className="h5">Find the perfect rental</h3>
                <p className="text-muted">Rent what you need without any hassle</p>
              </div>
            </div>
            <div className="col-lg-4 mb-3 mb-lg-0 text-center">
              <div className="px-0 px-lg-3">
                <div className="icon-rounded bg-primary-light mb-3">
                  <i style={{fontSize: '35px', color: 'grey', paddingTop: '15px'}} className="far fa-handshake"></i>
                </div>
                <h3 className="h5">Book with confidence</h3>
                <p className="text-muted">Fast and easy transfer so that you can get the most of what you want</p>
              </div>
            </div>
            <div className="col-lg-4 mb-3 mb-lg-0 text-center">
              <div className="px-0 px-lg-3">
                <div className="icon-rounded bg-primary-light mb-3">
                  <i style={{fontSize: '35px', color: 'grey', paddingTop: '16px'}} className="far fa-heart"></i>
                </div>
                <h3 className="h5">Enjoy your item</h3>
                <p className="text-muted">No matter how big, small or squishy it is, make sure to enjoy it</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-7 position-relative dark-overlay">
        <img src="https://d19m59y37dris4.cloudfront.net/directory/1-1/img/photo/photo-1497436072909-60f360e1d4b1.jpg" alt="" class="bg-image" />
        <div class="container">
          <div class="overlay-content text-white py-lg-5">
            <h3 class="display-3 font-weight-bold text-serif text-shadow mb-5">Ready to rent with confidence?</h3>
            <a href="/browse-all" class="btn btn-light">Get started</a>
          </div>
        </div>
      </section>
    </React.Fragment>
    )
  }
}
