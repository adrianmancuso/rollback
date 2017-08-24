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
    const h5Style = {
      color: '#287D99',
      fontFamily: 'Raleway',
      textAlign: 'justify'
    };

    return (

      <div className="App">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Raleway:400');
        </style>

       <MuiThemeProvider>
        <TopMenu />
       </MuiThemeProvider>
         <div
          style={{
            margin: "0 auto",
            padding: 10,
            width: "80%",
            display: 'block'
          }}
         >
            <h5 style={ h5Style }>
            Enter the item of clothing purchased, the store and the date.
           </h5> 
          
            <h5 style={ h5Style }>
              We will remind you when the return window is almost up.
            </h5> 
          
            <h5 style={ h5Style }>
              Easy.
            </h5>
          </div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <InputForm style={{ display: 'none'}}/>
        </MuiThemeProvider>

        <MuiThemeProvider>
          <BottomNav />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
