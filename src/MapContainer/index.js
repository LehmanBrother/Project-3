import React, { Component } from 'react';
import {Map, Polygon, GoogleApiWrapper} from 'google-maps-react';
import coordinates from '../Coordinates';
import Key from '../api_key'; 

export class MapContainer extends Component {
  constructor(){
    super();
    this.state = {
      stateCoord: []
    }
  }
  whatsUp = () => {
    console.log('whaddup');
  }
  getCoordinates = async () => {
    let coordinateArr = [];
    coordinates.features[0].geometry.coordinates[0].forEach((elem) => {
      let coordPair = {
        lat: elem[1],
        lng: elem[0]
      }
      coordinateArr.push(coordPair);
    });
    console.log(coordinateArr, '<------- coordArr');
    return coordinateArr
  }
  componentDidMount(){
    this.getCoordinates().then((data) => {

      this.setState({stateCoord: data})
      console.log(this.state, '<------- alabama');
    }).catch((err) => {
      console.log(err);
    });
    console.log(coordinates, '<--------- all coords');
  }
  render() {
    return (
      <Map 
        google={this.props.google} 
        zoom={14}>
        
        <Polygon
          paths={this.state.stateCoord}
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