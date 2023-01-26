import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import CartItem from "./CartItem";

/* The left-hand side pane of the app, displaying the cart items
   and the total cost. */
class LeftPane extends Component {
  render() {
    return (
      <Box id="leftPane">
        <Box id="checkoutItemsList" p={2}>
          <Grid container direction="column" spacing={2}>
            {this.props.cartList.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                product={cartItem}
                parentClickHandler={this.props.parentClickHandler}
              />
            ))}
          </Grid>
        </Box>
        <Box id="subtotalBar">
          Total after tax: ${this.props.cartSubtotalCalculator()}
        </Box>
      </Box>
    );
  }
}

export default LeftPane;
