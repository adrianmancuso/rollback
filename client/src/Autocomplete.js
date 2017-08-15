import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const stores = [];

var fetchStores = function() {
  const url = `api/stores`

  fetch(url, {
    accept: 'application/json',
  }).then((response) => response.json())
    .then((data) => (data.forEach(function(store){
      stores.push(store.name);
    })))
}

fetchStores();


const menuProps = {
  desktop: false,
  disableAutoFocus: true,
};

export default class StoreAutoComplete extends Component {
  render() {
    return (
        <AutoComplete
          hintText="Store Name"
          dataSource={stores}
          menuProps={menuProps}
          filter={AutoComplete.caseInsensitiveFilter}
        />

    );
  }
}