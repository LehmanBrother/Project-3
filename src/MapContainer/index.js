import React, { Component } from 'react';
import {Map, Polygon, GoogleApiWrapper} from 'google-maps-react';
import Key from '../api_key'; 

export class MapContainer extends Component {
  render() {
    const triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757},
      {lat: 25.774, lng: -80.190}
    ];
    return (
      <Map 
        google={this.props.google} 
        zoom={14}>

        <Polygon
          paths={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35} />

      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (Key)
})(MapContainer)