import React, {Component, Fragment} from 'react'
// import {connect} from 'react-redux'
import ItemCard from './itemCard'
import Carousel from 'nuka-carousel';
import Loading from 'react-loading-components';


 class ShowSlider extends Component {


  render() {
    console.log(this.props.items);
    return(
      <Fragment>

            {this.props.items.length ?
              <Fragment>
              <p class="subtitle text-sm text-primary mb-4">Other items from owner</p>
              <Carousel
              autoplay={true}

              slidesToShow={4}
              >
              {
                this.props.items.map(itemObj => {
                  return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
                })
              }
      </Carousel>
      </Fragment>
              :

              <div style={{display: 'block', marginTop: '10%', marginLeft: '50%'}}>
              <Loading style={{top: 'auto'}} type='puff' width={100} height={100} fill='#9eebfa' />
              </div>

            }



      </Fragment>

    )
  }

}

  // const mapStateToProps = state => {
  //   console.log(state);
  //   return {
  //     showItemOwner: state.showItemOwner
  //   }
  // }

export default ShowSlider




// {
//   this.props.items.map(itemObj => {
//     return <ItemCard key={itemObj.id} item={itemObj} title={itemObj.title} description={itemObj.description} category={itemObj.category}/>
//   })
// }
