import React, { Component } from 'react';
import {Map, Polygon, GoogleApiWrapper} from 'google-maps-react';
import coordinates from '../Coordinates';
import Key from '../api_key'; 

export class MapContainer extends Component {
  constructor(){
    super();
    this.state = {}
  }
  componentDidMount(){
    console.log(coordinates.features[0].geometry.coordinates[0]);
  }
  render() {
    return (
      <Map 
        google={this.props.google} 
        zoom={14}>

        <Polygon
          path={coordinates.features[0].geometry.coordinates[0]}
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