import React from 'react';
import Paper from 'material-ui/Paper';
import StoreAutoComplete from './StoreAutoComplete';
import Moment from 'moment'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AddToCalendar from 'react-add-to-calendar';

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
        title: '',
        description: '',
        location: '',
        startTime: '',
        endTime: ''
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
      padding: 20,
      margin: 20,
      backgroundColor: '#FBFFFF',
      textAlign: 'center',
      display: 'inline-block',
    };

    const h5Style = {
      color: '#287D99',
      fontFamily: 'Raleway',
      textAlign: 'justify'
    };

    return <div>
      <Paper 
      style={style} 
      zDepth={2}
      children={
        <div>
          <h5 style={ h5Style }>Enter the item of clothing purchased, the store and the date.
          </h5> 
          
          <h5 style={ h5Style }>
          We will remind you when the return window is almost up.
          </h5> 
          
          <h5 style={ h5Style }>
          Easy.
          </h5>

          <TextField
            onChange={this.handleItemFieldChange} 
            hintText="Item Bought"
            floatingLabelText="Item Bought"
          />
          <DatePicker
            onChange={this.handleDateChange}
            hintText="Date Purchased" 
            mode="portrait"

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
              right: 70
            }}>
            <AddToCalendar 
              style={{height: 200}}
              event={this.state.event}
              buttonLabel="Add To Calendar"
            />            
          </button> 
        </div>
        }
       />
    </div>

  }
}
export default InputForm;