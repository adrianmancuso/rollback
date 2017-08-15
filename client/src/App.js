import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopMenu from './TopMenu';
import InputForm from './InputForm'
import './App.css';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="App">

       <MuiThemeProvider>
        <TopMenu />
       </MuiThemeProvider>
        
        <MuiThemeProvider>
          <InputForm />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
