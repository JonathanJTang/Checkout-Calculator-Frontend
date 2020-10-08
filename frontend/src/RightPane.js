import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import { cyan } from '@material-ui/core/colors';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     overflow: 'hidden',
//     padding: theme.spacing(0, 3),
//   },
//   card: {
//     maxWidth: 400,
//     margin: `${theme.spacing(1)}px auto`,
//     padding: theme.spacing(2),
//   },
// }));

// const theme = createMuiTheme({
//   palette: {
//     secondary: cyan,
//   }
// });


/* Map of product name (from database) to custom icons */
const nameToIconMap = {
  water: <LocalDrinkIcon />,
  burger: <FastfoodIcon />
};

/* A button for ordering items, already wrapped in a grid container item
with centering. */
class OrderButton extends Component {
  onClickHandler() {
    this.props.parentClickHandler(this.props.productId);
  }

  render() {
    return (
      <Grid container style={{marginTop: "5px", marginBottom: "5px"}}>
        <Button
          variant="contained"
          color="secondary"
          endIcon={this.props.icon}
          style={{ margin: 'auto', backgroundColor: '#26c6da'}}
          onClick={this.onClickHandler.bind(this)}
        >
        {this.props.buttonText}
        </Button>
      </Grid>
    );
  }
}

class RightPane extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Box id="rightPane" p={1}>
        <Grid
          id="rightTest"
          container
          direction="column"
          justify="space-around"
          alignItems="stretch"
          spacing={2}>
          <Grid container direction="column" justify="center" overflow="auto"
            style={{ flexGrow: 1}}>
            {this.props.productList.map((product) => (
              <OrderButton
                icon={nameToIconMap[product.name.toLowerCase()] ? nameToIconMap[product.name.toLowerCase()] : <AddShoppingCartIcon />}
                productId={product.id}
                buttonText={product.name}
                parentClickHandler={this.props.parentClickHandler}
                key={product.id}/>
            ))}
          </Grid>
          <Grid container item>
            <Button variant="contained" size="large" color="primary"
              style={{ minWidth: '75%', minHeight: "40px", margin: 'auto' }}>
              Checkout
              </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default RightPane;
