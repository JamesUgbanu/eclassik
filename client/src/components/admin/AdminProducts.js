import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminSideNav from './AdminSideNav';
import Product from './AdminProductList';
import { deleteProduct } from '../../actions/index';
import { generateByPage } from '../helpers';
import Loading from '../Loading';

const AdminProducts = ({
  products, ajaxLoading, onDelete, currentPage, pages
}) => {
  if (ajaxLoading) {
    return (
      <Loading />
    );
  }
  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <main className="acc__main">
      <AdminSideNav />
      <div className="acc__container">
        <div className="product__header">
          <span>Product</span>
          <Link to="/add-product">Add a new</Link>
        </div>
        <hr />

        {/* <div className="product__form">
          <form>
            <div className="product__one">
              <label>Search:</label>
              <input type="search" name="search" />
            </div>

            <div className="product__two">
              <label>Filter by:</label>
              <input type="number" name="number" placeholder="all" />
            </div>

            <div className="product__three">
              <label>Order by:</label>
              <input type="number" name="number" placeholder="id" />
              <input className="joint__form" type="number" name="number" placeholder="Asc" />
            </div>

            <div className="product__four">
              <input type="submit" value="GO" />
            </div>
          </form>
        </div> */}
        <Product products={products} pages={pages} currentPage={currentPage} onDelete={onDelete} />
      </div>
    </main>
  );
};

AdminProducts.propTypes = {
  pages: PropTypes.number,
  currentPage: PropTypes.number,
  products: PropTypes.array,
  ajaxLoading: PropTypes.bool,
  onDelete: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  // Set page number to 1 if no number in url params
  const pageNo = ownProps.match.params.pageNo || 1;
  const products = generateByPage(state.products, pageNo, 10);
  return {
    products,
    pages: Math.ceil(state.products.length / 10), // Determine number of pages for pagination
    currentPage: pageNo,
    ajaxLoading: state.ajaxLoading
  };
};

const mapDispatchToProps = dispatch => ({
  onDelete: (id) => {
    dispatch(deleteProduct(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProducts);
