import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import apiKey from './apiKey.js'
import StateContainer from './StateContainer';

const baseEndPoint = 'https://api.census.gov/data/2017/pep/population?get='

class App extends Component {
  constructor(){
    super();
    this.state = {

    }
  }

  //gets all states + relevant info for intiial seed
  getAllStates = async () => {
    try {
      const allStates = await fetch(baseEndPoint + 'GEONAME,POP,DENSITY&for=state');
      console.log(allStates);
      const allStatesJson = await allStates.json();
      console.log(allStatesJson);
    } catch(err) {
      console.log(err);
    }
  }

  componentDidMount(){
    console.log('cdm');
    //this.getAllStates();
  }

  render() {
    return (
      <div className="App">
        <StateContainer />
      </div>
    );
  }
}

export default App;
