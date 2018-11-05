import React, { Component } from 'react';
import { Map, maps, GoogleApiWrapper, google } from 'google-maps-react';

import Key from '../api_key';

export class MapContainer extends Component {
  constructor(){
    super();
    this.state = {
      
    }
  }
  itsAlive = () => {
    console.log(`it's alive!`);
  }
  loadMapShapes = () => {
      console.log(`this works!`);
      maps.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/states.js', 
        { idPropertyName: 'STATE' }
      );

  }
  componentDidMount(){
    this.loadMapShapes();
  }
  render() {
    return (

        <Map google={this.props.google} 
          initialCenter={{
            lat: 41.878, 
            lng: -87.629
          }}
          zoom={14}
        >
        </Map>

    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (Key)
})(MapContainer)
