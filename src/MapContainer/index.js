import React, { Component } from 'react';
import {Map, Polygon, GoogleApiWrapper, Marker} from 'google-maps-react';
import coordinates from '../Coordinates';
import Key from '../api_key'; 

export class MapContainer extends Component {
  constructor(){
    super();
    this.state = {
      states: [],
      default: {
        lat: 41.8781,
        lng: 87.6298
      }
    }
  }
  whatsUp = () => {
    console.log('whaddup');
  }
  getCoordinates = async (feature) => {
    let coordinateArr = [];
    feature.geometry.coordinates[0].map((elem) => {
      let coordPair = {
        lat: Number(elem[1]),
        lng: Number(elem[0])
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
    let shapeToRender
    if (this.state.states.length){    
      shapeToRender = this.state.states.map((state, i) => {
        console.log(state.coords, '<---------', state.name);
        return (
          <Polygon
            id={state.name}
            key={i}
            paths={state.coords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35} />
        )
      })
    }

    return (
      <Map 
        google={this.props.google} 
        zoom={14}>

          {shapeToRender}

      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (Key)
})(MapContainer)