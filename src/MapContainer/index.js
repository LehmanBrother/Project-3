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
    //some states have more than one array - this logic
    //should help parse them
    if(feature.geometry.coordinates.length > 1){
      console.log('weird state:');
      feature.geometry.coordinates.forEach((subArr) => {
        subArr.map((elem) => {
          let coordPair = {
            lat: Number(elem[1]),
            lng: Number(elem[0])
          }
          coordinateArr.push(coordPair);
        });
      });
    }else{
      feature.geometry.coordinates[0].map((elem) => {
        let coordPair = {
          lat: Number(elem[1]),
          lng: Number(elem[0])
        }
        coordinateArr.push(coordPair);
      });
    }
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

  //methods for the map
  
  onMouseoverPolygon = (props, polygon, e) => {
    console.log('mouseover of ', props.id, 'all data: ', props);
    
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
            strokeColor="white"
            strokeOpacity={0.5}
            strokeWeight={2}
            fillColor="white"
            fillOpacity={0} 
            onMouseover={this.onMouseoverPolygon} />
        )
      })
    }

    return (
      <div className="map">
        <Map
          google={this.props.google} 
          initialCenter={{lat: 38, lng: -96}}
          zoom={4.3}
          style={{height: '450px', width: '825px'}}>
            {shapeToRender}
        </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (Key)
})(MapContainer)