import React from 'react';
import Paper from 'material-ui/Paper';
import StoreAutoComplete from './StoreAutoComplete';
import Moment from 'moment'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AddToCalendar from 'react-add-to-calendar';
import Snackbar from 'material-ui/Snackbar';

class InputForm extends React.Component{

  constructor(props) {
    super(props);
    this.handleItemFieldChange = this.handleItemFieldChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStoreFieldChange = this.handleStoreFieldChange.bind(this);
    this.setEventWindow = this.setEventWindow.bind(this);
    this.fetchReturnWindow = this.fetchReturnWindow.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.state = {
      open: false,
      hover: false,
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
      .then(this.setEventWindow)
      .then(this.state = { open: true });
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
    });
    console.log(this.state.event);
  }

  handleStoreFieldChange(value) {
    this.setState({ storeName: value })
  }

  toggleHover(event) {
    this.setState({hover: !this.state.hover})
  }

  render() {
    const style = {
      padding: "0 20px 25px 20px",
      margin: 20,
      backgroundColor: '#FBFFFF',
      textAlign: 'center',
      display: 'inline-block',
    };

    var hoverStyle;
    if (this.state.hover) {
      hoverStyle = {
        margin: '10px 0 0 0',
        padding: 10,
        fontSize: '2rem',
        fontFamily: 'Raleway',
        position: 'relative',
        borderBottom: "0.05rem solid #FF7369",
        backgroundColor: '#EEFDFF',
        boxShadow: '5px 3px 3px mistyrose',
        display: "inline-block"
      }
    } else {
      hoverStyle = {
        margin: '10px 0 0 0',
        padding: 10,
        fontSize: '2rem',
        fontFamily: 'Raleway',
        position: 'relative',
        borderBottom: "0.05rem solid #72b6cc",
        backgroundColor: 'white',
        display: "inline-block"
      }
    }

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
            mode="portrait"

          />
          <StoreAutoComplete
            onChange={this.handleStoreFieldChange}
          />
          <br/>
          <div 
            onClick={this.fetchReturnWindow}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
            style={hoverStyle}>
              <AddToCalendar 
                event={this.state.event}
              />            
          </div> 
        </div>
        }
       />
       <Snackbar
        open={this.state.open}
        message="Event added to your calendar"
        autoHideDuration={2000}
       />
    </div>

  }
}
export default InputForm;