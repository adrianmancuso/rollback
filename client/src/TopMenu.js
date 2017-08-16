import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import {cyan300} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const Logged = (props) => (
  <IconMenu
    style={{
    position: 'absolute',
    left: 10
      }}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Sign Out" />
  </IconMenu>
);

const Heading = (props) => (
  <div>
    <h1
    style={{
      color: 'white',
      fontFamily: 'Raleway',
      fontSize: '3.5em',
      display: 'inline-block',
      margin: '0 auto'
        }}
    >Rollback
    </h1>
  </div>
)

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan300,
  },
  appBar: {
    height: '4em',
  }
})

Logged.muiName = 'IconMenu'

export default class TopMenu extends React.Component {

  constructor(props) {
    super(props);    
  }


  render() {
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
  <div
    style={{
      backgroundColor: '#FF7369',
      padding: '2em',
      borderBottom: '0.2em solid white'
    }}
    >
    <Logged />
    <Heading />
  </div>
  </MuiThemeProvider>
  );
  }
}
