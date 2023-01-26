import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import OrderButton from "./OrderButton";

/* Map of product name (from database) to custom icons */
const nameToIconMap = {
  water: <LocalDrinkIcon />,
  burger: <FastfoodIcon />,
};

/* The right-hand side pane of the app, containing buttons for adding items to
   the cart as well as checking out the cart. */
class RightPane extends Component {
  render() {
    return (
      <Box id="rightPane" p={1}>
        <Box id="orderButtonsGroup">
          <Grid
            container
            direction="column"
            justifyContent="center"
            overflow="auto"
            style={{ flexGrow: 1 }}
          >
            {this.props.productList.map((product) => (
              <OrderButton
                icon={
                  nameToIconMap[product.name.toLowerCase()] ? (
                    nameToIconMap[product.name.toLowerCase()]
                  ) : (
                    <AddShoppingCartIcon />
                  )
                }
                productId={product.id}
                buttonText={product.name}
                parentClickHandler={this.props.parentClickHandler}
                key={product.id}
              />
            ))}
          </Grid>
        </Box>
        <Box>
          <Grid container item>
            <Button
              variant="contained"
              size="large"
              color="primary"
              style={{ minWidth: "75%", minHeight: "40px", margin: "auto" }}
              onClick={this.props.parentCheckoutClickHandler}
            >
              Checkout
            </Button>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default RightPane;
