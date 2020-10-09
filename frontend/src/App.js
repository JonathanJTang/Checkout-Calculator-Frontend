import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


import './App.css';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

// Use either the local Django server url, or the hosted server link
const baseUrl = "http://127.0.0.1:8000";
const apiBaseUrl = baseUrl + "/api";


class App extends Component {

  state = {
    productList: [],
    cartList: []
  };

  async componentDidMount() {
    try {
      const response = await fetch(apiBaseUrl + "/product-database");
      const productList = await response.json();
      this.setState({
        productList: productList
      });
    } catch (e) {
      console.log(e);
    }
  }

  async onOrderButtonClick(id) {
    const product = this.state.productList.find((product) => {return product.id === id});
    try {
      // Fetch database entry for this product, to see if there are any updates
      const response = await fetch(apiBaseUrl + `/product-database/${product.id}`);
      const updatedProduct = await response.json();
      // console.log(updatedProduct);
      if (updatedProduct.available_stock <= 0) {  // If product now out of stock
        alert(`Sorry, product ${product.name} is out of stock`);
      } else {
        const cartItemIndex = this.state.cartList.findIndex((cartItem) => {return cartItem.id === product.id});
        if (cartItemIndex === -1) {
          // The cart currently has no items of this product 
          const cartProduct = Object.assign({}, product);
          delete cartProduct.available_stock;
          cartProduct.quantity = 1;
          this.setState({cartList: this.state.cartList.concat(cartProduct)});
        } else {
          // The cart currently has no items of this product 
          const cartProduct = this.state.cartList[cartItemIndex];
          cartProduct.quantity += 1;
          this.setState({cartList: this.state.cartList});
        }
        
      }
    } catch (e) {
      alert("Sorry, an error occurred. Please try again, making sure the web server is online.");
      console.log(e);
    }
  }

  onCartItemRemoveClick(id) {
    const cartItemIndex = this.state.cartList.findIndex((cartItem) => {return cartItem.id === id});
    console.log("before delete: ", this.state.cartList);
    this.state.cartList.splice(cartItemIndex, 1);
    console.log("after delete: ", this.state.cartList);
    this.setState({cartList: this.state.cartList});
  }

  onCheckoutClick() {
    alert("You have successfully checked out the items!\nPress 'OK' to checkout the next customer")
    this.setState({cartList: []})  // Clear the cart
  }

  render() {
    return (
      <div className="App">
        <Box>
          <AppBar position="fixed" className="appHeader">
            <Toolbar>
              Checkout Calculator
            </Toolbar>
          </AppBar>
          <Box><header className="appHeader"></header></Box>
          <RightPane
            productList={this.state.productList}
            parentClickHandler={this.onOrderButtonClick.bind(this)}
            parentCheckoutClickHandler={this.onCheckoutClick.bind(this)}
          >
          </RightPane>
          <LeftPane
            cartList={this.state.cartList}
            parentClickHandler={this.onCartItemRemoveClick.bind(this)}
          >
          </LeftPane>
        </Box>
      </div>
    );
  }
}

export default App;
