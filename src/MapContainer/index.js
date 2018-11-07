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
    const coords = {coordinates}
    coords.features.map((feature) => {
      let oneState ={
        name: feature.properties.NAME,
        coords: null
      };
      this.getCoordinates(feature).then((state) => {
        oneState.coords = state
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
    }).catch((err) => {
      console.log(err);
    });
  }
  render() {
    console.log(this.state.states, '<--------- all coords');
    return (
      <div className="map">
        <Map
          google={this.props.google} 
          initialCenter={{lat: 38, lng: -96}}
          zoom={4.3}
          style={{height: '450px', width: '825px'}}>
        </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (Key)
})(MapContainer)