import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core';
import Decimal from 'decimal.js-light';


const styles = {
  card: {
    maxWidth: 700,
    // margin: `${theme.spacing(1)}px auto`,
    padding: 10,
  },
  cardItem: {
    margin: "auto",
  },
  priceRegular: {
    color: "black",
  },
  priceDiscount: {
    color: "green",
    fontWeight: "bold",
  },
};

/* An entry in the shopping cart. */
class CartItem extends Component {
  onClickHandler() {
    this.props.parentClickHandler(this.props.product.id);
  }

  /* Return the corresponding style className based on whether this product is discounted. */
  priceStyle() {
    if (this.props.product.discount > 0) {
      return this.props.classes.priceDiscount;
    } else {
      return this.props.classes.priceRegular;
    }
  }

  render() {
    return (
      <Grid item>
        <Card className={this.props.classes.card} data-testid="cartItem">
          <Grid container direction="row" justify="space-between">
            <Grid item className={this.props.classes.cardItem}
                style={{flexGrow: 4}}>
              <strong>{this.props.product.name} </strong>
            </Grid>
            <Grid item className={this.props.classes.cardItem}
                style={{flexGrow: 1, textAlign: "right"}}>
              {this.props.product.quantity} x <span className={this.priceStyle()}>${this.props.product.price - this.props.product.discount}</span> = 
            </Grid>
            <Grid item className={this.props.classes.cardItem}
                style={{flexGrow: 1, textAlign: "right"}}>
              <span className={this.priceStyle()}>
                $ {(new Decimal(this.props.product.price - this.props.product.discount).times(this.props.product.quantity)).toFixed(2)}
              </span>
            </Grid>
            <Grid item className={this.props.classes.cardItem}
                style={{flexGrow: 1, textAlign: "right"}}>
              <IconButton color="secondary" size="small" aria-label="remove this item"
                  onClick={this.onClickHandler.bind(this)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}
CartItem = withStyles(styles)(CartItem);

/* The left-hand side pane of the app. */
class LeftPane extends Component {
  render() {
    return (
      <Box id="leftPane">
        <Box id="checkoutItemsList" p={2}>
          <Grid container direction="column" spacing={2}>
            {this.props.cartList.map(cartItem => (
              <CartItem key={cartItem.id} product={cartItem}
                parentClickHandler={this.props.parentClickHandler}/>
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

export default withStyles(styles)(LeftPane);