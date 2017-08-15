import React from 'react';
import Paper from 'material-ui/Paper';
import StoreAutoComplete from './StoreAutoComplete';
import Moment from 'moment'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AddToCalendar from 'react-add-to-calendar'

  // const CLIENT_ID = "1067946640271-cq4jq2rd8efhultg1v6sbgk01dot1jos.apps.googleusercontent.com";
  // const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  // const SCOPES = "https://www.googleapis.com/auth/calendar";

class InputForm extends React.Component{

  constructor(props) {
    super(props);
    this.handleItemFieldChange = this.handleItemFieldChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStoreFieldChange = this.handleStoreFieldChange.bind(this);
    this.setEventWindow = this.setEventWindow.bind(this);
    this.fetchReturnWindow = this.fetchReturnWindow.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.state = {
      storeName: '',
      purchaseDate: '',
      item: '',
      returnWindow: 0,
      startTime: '',
      endTime: '',
      event: {
        title: 'Testing Event',
        description: 'I AM AROBOT',
        location: 'Portland, OR',
        startTime: '2017-09-16T20:15:00-04:00',
        endTime: '2017-09-16T21:45:00-04:00'
      }
    };
  }

  componentDidMount() {
  }

  handleItemFieldChange(event) {
    console.log(this.state);
    this.setState({ item: event.target.value })
  }

  handleDateChange(event, date) {
    this.setState({ purchaseDate: date });
  }

  fetchReturnWindow() {
    let selectedStore = this.state.storeName;
    let url = `api/stores#index`;

    fetch(url, {
      accept: 'application/json',
    }).then((response) => response.json())
      .then((storeList) => (storeList.forEach((store) => {
          if (store.name === selectedStore) {
          this.setState({ returnWindow: store.return_window});
          }
        })))
      .then(this.convertTime)
      .then(this.setEventWindow);
  };

  convertTime() {
    let purchaseDate = Moment(this.state.purchaseDate);

    let returnWindow = this.state.returnWindow;
    
    let returnDateEnd = purchaseDate.clone().add(returnWindow, 'day');

    let returnDateStart = purchaseDate.clone().add((returnWindow-1), 'day');

    this.setState({
      startTime: returnDateStart.format(),
      endTime: returnDateEnd.format()
    });
  }
    
  setEventWindow(event) {
    this.setState({
      event: {
        title: 'Last day to return ' + this.state.item,
        description: this.state.storeName,
        location: this.state.storeName + ', Melbourne, AUS',
        startTime: this.state.startTime,
        endTime: this.state.endTime
      }
    })
  }

  handleStoreFieldChange(value) {
    this.setState({ storeName: value })
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
            onClick={this.fetchReturnWindow}
            style={{
              padding: 10,
              position: 'relative',
              right: 60
            }}>Add to Calendar</button>
            <AddToCalendar 
              event={this.state.event}
              buttonLabel="Let's do this shit"
            />;
        </div>
        }
       />
    </div>

  }
}
export default InputForm;