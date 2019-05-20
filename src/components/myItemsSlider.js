import React, {Component, Fragment} from 'react'
// import {connect} from 'react-redux'
import CarCard from './carCard'
import Carousel from 'nuka-carousel';
import Loading from 'react-loading-components';
import {connect} from 'react-redux'

 class ShowSlider extends Component {


  render() {
    return(
      <Fragment>
            {
              this.props.items ?

                (this.props.items.length > 0 ?
                <Fragment>
                <div className="col-lg-4">
                  <p className="subtitle text-sm text-primary">Other items from owner</p>
                  <h5 className="mb-4">{this.props.showItemOwner.name}'s Items </h5>
                </div>
                  <Carousel
                  autoplay={true}
                  slidesToShow={4}
                  style={{paddingBottom: '50px'}}
                  >
                  {
                    this.props.items.map(itemObj => {
                      return <CarCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
                    })
                  }
                  </Carousel>
                </Fragment>
                :
                <div style={{height: '50px'}} className="text-block"></div>)
              :
              <div style={{display: 'block', marginTop: '10%', marginLeft: '50%'}}>
                <Loading style={{top: 'auto'}} type='puff' width={100} height={100} fill='#9eebfa' />
              </div>
            }
      </Fragment>

    )
  }

}

  const mapStateToProps = state => {
    return {
      showItemOwner: state.showItemOwner
    }
  }

export default connect(mapStateToProps)(ShowSlider)




// {
//   this.props.items.map(itemObj => {
//     return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
//   })
// }
