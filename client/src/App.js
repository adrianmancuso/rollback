import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopMenu from './TopMenu';
import InputForm from './InputForm'
import BottomNav from './BottomNav'
import './App.css';
import {red200} from 'material-ui/styles/colors';
import {lightBlue200} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: red200,
    headerColor: lightBlue200
  },
});

class App extends Component {
  render() {
    return (

      <div className="App">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Raleway:400');
        </style>

       <MuiThemeProvider>
        <TopMenu />
       </MuiThemeProvider>
        
        <MuiThemeProvider muiTheme={muiTheme}>
          <InputForm />
        </MuiThemeProvider>

        <MuiThemeProvider>
          <BottomNav />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
