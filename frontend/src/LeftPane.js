import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core';
import Decimal from 'decimal.js-light';


const ontarioGSTRate = new Decimal(0.13);

const styles = {
  card: {
    maxWidth: 700,
    // margin: `${theme.spacing(1)}px auto`,
    padding: 10,
  },
  cardItem: {
    margin: "auto",
  },
};


class CartItem extends Component {
  onClickHandler() {
    this.props.parentClickHandler(this.props.product.id);
  }

  render() {
    return (
      <Grid item >
        <Card className={this.props.classes.card}>
          <Grid container direction="row" spacing={0} justify="space-between">
            <Grid item xs={8} className={this.props.classes.cardItem}
                style={{flexGrow: 0}}>
              <strong>{this.props.product.name} </strong>
            </Grid>
            <Grid item className={this.props.classes.cardItem}
                style={{flexGrow: 0, textAlign: "right"}}>
              {this.props.product.quantity} x ${this.props.product.price} = 
            </Grid>
            <Grid item className={this.props.classes.cardItem}
                style={{flexGrow: 0, textAlign: "right"}}>
              $ {(new Decimal(this.props.product.price).times(this.props.product.quantity)).toFixed(2)}
            </Grid>
            <Grid item className={this.props.classes.cardItem}
                style={{flexGrow: 0, textAlign: "right"}}>
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

class LeftPane extends Component {

  calculateSubtotal() {
    // Sum up taxed items and non-taxed items separately, and apply the tax multiplier
    // at the end to avoid decimal inaccuracies
    let nonTaxedSubtotal = new Decimal(0);
    let taxedSubtotal = new Decimal(0);
    for (const cartItem of this.props.cartList) {
      if (cartItem.taxed_item) {
        taxedSubtotal = taxedSubtotal.add(new Decimal(cartItem.price).times(cartItem.quantity));
      } else {
        nonTaxedSubtotal = nonTaxedSubtotal.add(new Decimal(cartItem.price).times(cartItem.quantity));
      }
      console.log(nonTaxedSubtotal.toString(), taxedSubtotal.toString());
    }
    return (nonTaxedSubtotal.add(taxedSubtotal.times(ontarioGSTRate.add(1)))).toFixed(2);
  }

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
        <Box id="subtotalBar" style={{textAlign: "right"}}>
          Total after tax: ${this.calculateSubtotal()}
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(LeftPane);