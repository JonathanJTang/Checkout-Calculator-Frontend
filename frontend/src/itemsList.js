import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';


function CheckoutItem(props) {
  return (
    <Card>
      <Typography>{props.message}</Typography>
      {props.children}
    </Card>
  );
}


function CheckoutItemsList(props) {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="stretch"
    ></Grid>
  );
}

//CheckoutItemsList.appendChild(<CheckoutItem></CheckoutItem>)

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CheckoutItem message="Lorum ipsum"></CheckoutItem>
    );
  }
}