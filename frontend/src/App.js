import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box id="rightPane" p={1}>
        <Grid
          id="rightTest"
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          spacing={2}>
            <Grid container item style={{flexGrow: 4}}>
              Buttons
            </Grid>
            <Grid container item>
              <Button variant="contained" size="large" color="primary"
                  style={{minWidth: '75%', minHeight: "40px", margin: 'auto'}}>
                Checkout
              </Button>
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
        <Box>
          <AppBar position="fixed" className="appHeader">
            <Toolbar>
              Checkout Calculator
            </Toolbar>
          </AppBar>
          <Box><header className="appHeader"></header></Box>
          <RightPane></RightPane>
          <LeftPane productList={this.state.productList == null ? "Did not receive data from server" : this.state.productList}></LeftPane>
        </Box>
      </div>
    );
  }
}

export default App;
