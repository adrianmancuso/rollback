import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import FaceIcon from 'material-ui/svg-icons/action/face';
import HistoryIcon from 'material-ui/svg-icons/action/history';

const nearbyIcon = <IconLocationOn />;
const faceIcon = <FaceIcon />;
const historyIcon = <HistoryIcon />;


class BottomNav extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
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
            label="Locations"
            icon={nearbyIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNav;