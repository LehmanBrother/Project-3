import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import apiKey from './apiKey.js'
import StateContainer from './StateContainer';
import SearchContainer from './SearchContainer';

const baseEndPoint = 'https://api.census.gov/data/2017/pep/population?get='

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentState: {
        name: '',
        pop: 0,
        density: 0,
        code: 0
      }
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

  geoSearch = async (search, e) => {
    e.preventDefault();
    try {
      const searchedGeo = await fetch('http://localhost:9000/api/v1/census/stateSearch/' + search.searchText);
      const parsedResponse = await searchedGeo.json();
      const censusState = await fetch(baseEndPoint + 'GEONAME,POP,DENSITY&for=state:' + parsedResponse.data[0].code)
      const censusStateJson = await censusState.json();
      this.setState({
        //censusStateJson is an array that contains one dummy entry and one or more state entries, so we use [1]
        currentState: {
          name: censusStateJson[1][0],
          pop: censusStateJson[1][1],
          density: censusStateJson[1][2],
          code: censusStateJson[1][3]
        }
      })
      console.log(this.state);
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
        <SearchContainer geoSearch={this.geoSearch} />
      </div>
    );
  }
}

export default App;
