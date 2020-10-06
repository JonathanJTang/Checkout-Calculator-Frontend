import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core';


const styles = {
  card: {
    maxWidth: 400,
    // margin: `${theme.spacing(1)}px auto`,
    padding: 10,
  },
};

class LeftPane extends Component {
  constructor(props) {
    super(props);
    console.log("LeftPane props: " + props);
  }

  /*
  <Box p={1}>
    <Grid
      container
      direction="row"
      // justify="center"
      alignItems="stretch"
      spacing={2}>
      <Grid item xs={9}>
        Column 1
      </Grid>
      <Grid item xs={3}>
        Column 2
      </Grid>
    </Grid>
  </Box>
  */
  render() {
    return (
      <Box id="leftPane">
        <Box id="checkoutItemsList" p={2}>
          <Grid container direction="column" spacing={2}>
            {this.props.productList == null ? "Did not receive data from server" : this.props.productList.map(item => (
              <Grid item>
                <Card key={item.id} className={this.props.classes.card}>
                  <strong>{item.name} </strong>
                  <span>{item.price}</span>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box id="subtotalBar">Subtotal</Box>
      </Box>
    );
  }
}

export default withStyles(styles)(LeftPane);