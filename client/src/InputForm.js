import React from 'react';
import Paper from 'material-ui/Paper';
import StoreAutoComplete from './StoreAutoComplete';
import Moment from 'moment'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker'

class InputForm extends React.Component{

  constructor(props) {
    super(props);
    this.handleItemFieldChange = this.handleItemFieldChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStoreFieldChange = this.handleStoreFieldChange.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.state = {
      storeName: '',
      purchaseDate: '',
      item: '',
      authorizeButton: true,
      signOutButton: false,
    }
  }

  // const CLIENT_ID = "<%= ENV["CLIENT_ID"] %>";
  // const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  // const SCOPES = "https://www.googleapis.com/auth/calendar";

  componentDidMount() {
    this.loadApi();
  }

  // loadApi() {
  //   const script = document.createElement('script');
  //   script.src = 'https://apis.google.com/js/api.js';
  //   document.body.appendChild(script);

  //   script.onload = () => {
  //     window.gapi.load('client:auth2', this.checkAuth.bind(this));
  //   }
  // }

  // loads auth2 and API client library
  // handleClientLoad() {
  //   gapi.load('client:auth2', initClient)
  // }

  // initClient() {
  //   gapi.client.init({
  //     discoveryDocs: DISCOVERY_DOCS,
  //     clientId: CLIENT_ID,
  //     scope: SCOPES
  //   }).then(function() {
  //     // listen for sign-in state changes
  //     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);

  //     // handle initial sign-in state
  //     updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  //     authorizeButton.onclick = handleAuthClick;
  //     signOutButton.onclick = handleSignOutClick;
  //   });
  // }

  updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
      console.log('is signed in');
    }
  }

  handleItemFieldChange(event) {
    console.log(this.state);
    this.setState({ item: event.target.value })
  }

  handleDateChange(event, date) {
    this.setState({ purchaseDate: date });
  }

  handleStoreFieldChange(value) {
    this.setState({ storeName: value })
  }

  // addEvent(newEvent) {
  //   const request = gapi.client.calendar.events.insert({
  //     'calendarId': 'primary',
  //     'resource': newEvent
  //   });
  // }

  createEvent() {
    const storeName = this.state.storeName;
    const purchaseDate = this.state.purchaseDate;
    const item = this.state.item;

  }

  render() {
    const style = {
      height: '40vh',
      width: '80vw',
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    return <div>
      <Paper 
      style={style} 
      zDepth={2}
      children={
        <div>
          <TextField
            onChange={this.handleItemFieldChange} 
            hintText="Item Bought"
            floatingLabelText="Item Bought"
          />
          <DatePicker
            onChange={this.handleDateChange}
            hintText="Date Purchased" 
            mode="landscape"
          />
          <StoreAutoComplete
            onChange={this.handleStoreFieldChange}
          />
          <br/>
          <button 
            onClick={this.addEvent}
            style={{
              padding: 10,
              position: 'relative',
              right: 60
            }}>Add to Calendar</button>
        </div>
        }
       />
    </div>

  }
}
export default InputForm;