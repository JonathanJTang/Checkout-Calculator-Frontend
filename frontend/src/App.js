import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Decimal from "decimal.js-light";
import produce from "immer";

import "./App.css";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

// Use either the local Django server url, or the hosted server link
// const baseUrl = "http://127.0.0.1:8000";
// const baseUrl = "https://checkoutcalculator301.herokuapp.com";
const baseUrl = "https://checkoutcalculator.fly.dev";
// baseUrl should NOT end with a '/' forward slash
const apiBaseUrl = baseUrl + "/api";

const ontarioGSTRate = new Decimal(0.13);

/** Handles the state logic of the app */
class App extends Component {
  /* Each product in productList has the following fields from the database:
     - id: int
     - name: string
     - price: string representing number accurate to 2 decimal places
     - taxed_item: boolean
     - available_stock: int
     - discount: string representing nonnegative number accurate to 2 decimal places
  */
  /* In cartList we store similar objects but with slightly different fields:
     - id: int
     - name: string
     - price: string representing number accurate to 2 decimal places
     - taxed_item: boolean
     - discount: string representing nonnegative number accurate to 2 decimal places
     - quantity: int of number of items in the cart
  */
  state = {
    productList: [],
    cartList: [],
  };

  fetchErrorHandler(e) {
    if (e instanceof TypeError) {
      // Network error or CORS misconfigured on the server
      alert(
        "Sorry, could not connect to the server. Please try again, making sure the web server is online."
      );
    } else {
      alert("Sorry, an error occurred. Please try again later");
      console.log(e);
    }
  }

  async componentDidMount() {
    try {
      /* Fetch product database from backend */
      const response = await fetch(apiBaseUrl + "/product-database");
      const productList = await response.json();
      this.setState({
        productList: productList,
      });
    } catch (e) {
      this.fetchErrorHandler(e);
    }
  }

  async onOrderButtonClick(id) {
    const product = this.state.productList.find((product) => {
      return product.id === id;
    });
    try {
      // Fetch database entry for this product, to see if there are any updates
      const response = await fetch(
        apiBaseUrl + `/product-database/${product.id}`
      );
      const updatedProduct = await response.json();
      if (updatedProduct.available_stock <= 0) {
        // If product now out of stock
        alert(`Sorry, product ${product.name} is out of stock`);
      } else {
        const cartItemIndex = this.state.cartList.findIndex((cartItem) => {
          return cartItem.id === product.id;
        });
        if (cartItemIndex === -1) {
          // The cart currently has no items of this product
          const cartProduct = Object.assign({}, product);
          delete cartProduct.available_stock;
          cartProduct.quantity = 1;
          this.setState((state) => {
            return { cartList: state.cartList.concat(cartProduct) };
          });
        } else if (
          this.state.cartList[cartItemIndex].quantity ===
          updatedProduct.available_stock
        ) {
          // Can't add more of this product to the cart than the available stock
          alert(
            `Sorry, there are only ${product.available_stock} ${product.name} in stock`
          );
        } else {
          // The cart currently has one or more items of this product
          this.setState(produce(draft => { draft.cartList[cartItemIndex].quantity++ }));
        }
      }
    } catch (e) {
      this.fetchErrorHandler(e);
    }
  }

  onCartItemRemoveClick(id) {
    this.setState((state) => {
      return {
        cartList: state.cartList.filter((cartItem) => cartItem.id !== id),
      };
    });
  }

  onCheckoutClick() {
    alert(
      "You have successfully checked out the items!\nPress 'OK' to checkout the next customer"
    );
    this.setState({ cartList: [] }); // Clear the cart
  }

  calculateSubtotal() {
    // Sum up taxed items and non-taxed items separately, and apply the tax
    // multiplier at the end to avoid decimal inaccuracies
    let nonTaxedSubtotal = new Decimal(0);
    let taxedSubtotal = new Decimal(0);
    for (const cartItem of this.state.cartList) {
      if (cartItem.taxed_item) {
        taxedSubtotal = taxedSubtotal.add(
          new Decimal(cartItem.price - cartItem.discount).times(
            cartItem.quantity
          )
        );
      } else {
        nonTaxedSubtotal = nonTaxedSubtotal.add(
          new Decimal(cartItem.price - cartItem.discount).times(
            cartItem.quantity
          )
        );
      }
    }
    return nonTaxedSubtotal
      .add(taxedSubtotal.times(ontarioGSTRate.add(1)))
      .toFixed(2);
  }

  render() {
    return (
      <div className="App">
        <Box>
          <AppBar position="fixed" className="appHeader">
            <Toolbar>Checkout Calculator</Toolbar>
          </AppBar>
          <Box>
            <header className="appHeader"></header>
          </Box>
          <RightPane
            productList={this.state.productList}
            parentClickHandler={this.onOrderButtonClick.bind(this)}
            parentCheckoutClickHandler={this.onCheckoutClick.bind(this)}
          ></RightPane>
          <LeftPane
            cartList={this.state.cartList}
            parentClickHandler={this.onCartItemRemoveClick.bind(this)}
            cartSubtotalCalculator={this.calculateSubtotal.bind(this)}
          ></LeftPane>
        </Box>
      </div>
    );
  }
}

export default App;
