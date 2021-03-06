import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart } from '../actions/index';
import Left from './LeftNav';
import { findCurrentItem, checkForItemState } from './helpers';
import Loading from './Loading';
// eslint-disable-next-line react/prefer-stateless-function
class SingleProduct extends Component {
  render() {
    const { ajaxLoading, currentProduct, cart } = this.props;
    if (ajaxLoading || !currentProduct) {
      return (
        <Loading />
      );
    }
    const images = Object.values(currentProduct.image_url);
    const cartObj = {
      prod_id: currentProduct.prod_id,
      prod_name: currentProduct.prod_name,
      image_url: currentProduct.image_url,
      price: currentProduct.price,
      short_desc: currentProduct.short_desc,
      cartQuantity: 1
    };
    return (
    // eslint-disable-next-line react/jsx-filename-extension
      <main className="container__section">
        <Left />
        <div className="container__box">
          <div className="content_box container__top__space">
            <div className="single_img">
              <img src={images[0]} />
            </div>
            <div className="description__box">
              <div className="description">
                <h1>{ currentProduct.prod_name }</h1>
                <h2>${ currentProduct.price }</h2>
                <p>{ currentProduct.short_desc }</p>
              </div>
              <div className="previews">
                <div className="preview_img">
                  { images.map((image, i) => <img key={i} src={image} />)}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="container__box">
          {
                checkForItemState(cart, currentProduct.prod_id)
                  ? <button disabled>Item already in cart</button>
                  : <button className="active" onClick={() => this.props.addCart(cartObj)}>Add to Cart</button>
            }
        </div>
      </main>
    );
  }
}

SingleProduct.propTypes = {
  ajaxLoading: PropTypes.bool,
  currentProduct: PropTypes.object,
  cart: PropTypes.array
};
const mapStateToProps = (state, ownProps) => {
  const currentProduct = state.products.length ? findCurrentItem(state.products, ownProps.match.params.productId) : null;
  return {
    currentProduct,
    cart: state.cart,
    ajaxLoading: state.ajaxLoading
  };
};
const mapDispatchToProps = dispatch => ({
  addCart: (item) => {
    dispatch(addToCart(item));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct);
