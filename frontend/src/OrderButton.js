import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

/* A button for ordering items, already wrapped in a grid container item
   with centering. */
class OrderButton extends Component {
  onClickHandler() {
    this.props.parentClickHandler(this.props.productId);
  }

  render() {
    return (
      <Grid container style={{ marginTop: "5px", marginBottom: "5px" }}>
        <Button
          variant="contained"
          color="secondary"
          endIcon={this.props.icon}
          style={{ margin: "auto", backgroundColor: "#26c6da" }}
          onClick={this.onClickHandler.bind(this)}
        >
          {this.props.buttonText}
        </Button>
      </Grid>
    );
  }
}

export default OrderButton;
