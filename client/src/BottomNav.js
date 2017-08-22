import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Create from 'material-ui/svg-icons/content/create';
import FaceIcon from 'material-ui/svg-icons/action/face';
import HistoryIcon from 'material-ui/svg-icons/action/history';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar'

const create = <Create />;
const faceIcon = <FaceIcon />;
const historyIcon = <HistoryIcon />;


class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.select = this.select.bind(this);
  }

  state = {
    selectedIndex: 0,
    open: false,
    Snackbar: false
  };

    handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({
      open: false,
      Snackbar: true
    });
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {

    const actions = [
      <FlatButton
        label="Sign Up"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <Paper 
      zDepth={2}
      style={{
        position: 'fixed',
        bottom: 0
      }}
      >
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Home"
            icon={faceIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="History"
            icon={historyIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Sign Up"
            icon={create}
            onTouchTap={this.handleOpen}
          />
          <Dialog
            title="New user? Sign up!"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
          Let us to keep track of your returns and receipts for you.
          <TextField
            onChange={this.handleItemFieldChange} 
            hintText="Enter Your Email"
            floatingLabelText="Email:"
          /><br />
          <TextField
            onChange={this.handleItemFieldChange} 
            hintText="Don't Use 'Password'"
            floatingLabelText="Password"
            type="password"
          /><br />
        </Dialog>
        <Snackbar
          open={this.state.Snackbar}
          message="User added"
          autoHideDuration={2000}
        />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNav;