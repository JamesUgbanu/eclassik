import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCartTotal } from './helpers';

// eslint-disable-next-line react/prefer-stateless-function
class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
    // eslint-disable-next-line react/jsx-filename-extension
      <header className="shadow__menu">
        <div className="topbar top__menu">
          <input type="checkbox" id="menuToggle" />
          <label htmlFor="menuToggle" className="menu__icon fa fa-bars fa-2x" />
          <nav className="navigation__menu">
            <ul>
              <a href="/"><li>Home</li></a>
              <a href="/products"><li>All Products</li></a>
              <a href="#"><li>About us</li></a>
              <a href="#"><li>Contact us</li></a>
              {isAuthenticated() ? (
                <button className="auth__btn" onClick={logout}>Logout</button>
              ) : (
                <button className="auth__btn" onClick={login}>Log In/SignUp</button>
              )}

            </ul>
          </nav>
        </div>

        <div className="topbar">
          <a href="/"><img className="logo" src="images/eclassik-small-logo.png" alt="Eclassic logo" /></a>
        </div>
        <div className="topbar">
          <div className="cart__box">
            <a href="/cart">
              <i className="fa fa-shopping-bag fa-3x"><span>{this.props.cart ? this.props.cart.length : 0}</span></i>
              <div className="cart__total">
$
                { getCartTotal(this.props.cart) }
              </div>
            </a>
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(
  mapStateToProps,
  null
)(Nav);
