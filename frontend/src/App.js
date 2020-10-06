import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import './App.css';
import './itemsList.js'
import LeftPane from './LeftPane';


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

class RightPane extends Component {
  render() {
    return (
      <Box id="rightPane" p={1}>
        <Grid
          id="rightTest"
          container
          direction="column"
          // justify="center"
          alignItems="stretch"
          spacing={2}>
            <Grid item xs={9}>
              <Button variant="contained" size="large" color="primary">
                Checkout
              </Button>
            </Grid>
            <Grid item>
              
            </Grid>
        </Grid>
      </Box>
    );
  }
}

class App extends Component {

  state = {
    productList: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/product-database');
      const productList = await res.json();
      this.setState({
        productList
      });
      console.log(productList)
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="App">
        <Box m={0}>
          <header className="appHeader">Checkout Calculator</header>
        </Box>
        <Box>
          <RightPane></RightPane>
          <LeftPane productList={this.state.productList == null ? "Did not receive data from server" : this.state.productList}></LeftPane>
        </Box>
      </div>
    );
  }
}

export default App;
