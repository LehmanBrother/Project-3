import React, { Component } from 'react';
import {Map, Polygon, GoogleApiWrapper} from 'google-maps-react';
import coordinates from '../Coordinates';
import Key from '../api_key'; 

export class MapContainer extends Component {
  constructor(){
    super();
    this.state = {
      states: []
    }
  }
  whatsUp = () => {
    console.log('whaddup');
  }
  getCoordinates = async (feature) => {
    let coordinateArr = [];
    feature.geometry.coordinates[0].map((elem) => {
      let coordPair = {
        lat: elem[1],
        lng: elem[0]
      }
      coordinateArr.push(coordPair);
    });
    console.log(coordinateArr, '<------- getCoordinates ');
    return coordinateArr
  }
  getAllStatesCoordinates = async () => {
    //coordinates are in an array of an array of an array
    //this converts them into an array of objects for each state
    const allStates = [];
    coordinates.features.map((feature) => {
      let oneState ={
        name: feature.properties.NAME,
        coords: []
      };
      this.getCoordinates(feature).then((state) => {
        oneState.coords.push(state)
      });
      allStates.push(oneState);
    });
    return allStates
  }
  componentDidMount(){
    this.getAllStatesCoordinates().then((data) => {
      this.setState({
        states: data
      });
      console.log(this.state.states, '<--------- all coords');
    }).catch((err) => {
      console.log(err);
    });
  }
  render() {
    return (
      <Map 
        google={this.props.google} 
        zoom={14}>
        
        

      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (Key)
})(MapContainer)