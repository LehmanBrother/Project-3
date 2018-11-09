import React, { Component } from 'react';
import GameContainer from './GameContainer';
import MapContainer from './MapContainer';
import './App.css';
// import apiKey from './apiKey.js'
// import API_KEY from '..env';
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
      },
      currentPlaces: [],
      showState: true,//this will determine whether StateContainer shows state or place
      userStates: [],
      userPlaces: []
    }
  }

  //gets all states + relevant info for intiial seed
  getUserStates = async () => {
    try {
      const userStates = await fetch('http://localhost:9000/api/v1/census/states');
      const userStatesJson = await userStates.json();
      return userStatesJson.data;
    } catch(err) {
      console.log(err);
    }
  }

  //add getUserPlaces
  getUserPlaces = async () => {
    try {
      console.log('getUserPlaces called');
      const userPlaces = await fetch('http://localhost:9000/api/v1/census/places');
      const userPlacesJson = await userPlaces.json();
      return userPlacesJson.data;
    } catch(err) {
      console.log(err);
    }
  }

  geoSearch = async (search, e) => {
    console.log("Here");
    e.preventDefault();
    await this.setState({
      showState: search.searchType === 'State'
    });
    console.log(search.searchText, '<-------- search text pre-if-showstate');
    console.log(this.state.showState, '<------ showState');
    if(this.state.showState) {
      try {
        const searchedGeo = await fetch('http://localhost:9000/api/v1/census/stateSearch/' + search.searchText);
        const parsedResponse = await searchedGeo.json();
        const censusState = await fetch(baseEndPoint + 'GEONAME,POP,DENSITY&for=state:' + parsedResponse.data[0].code)
        const censusStateJson = await censusState.json();
        console.log(censusStateJson, '<----- state data working??');
        this.setState({
          //censusStateJson is an array that contains one dummy entry and one or more state entries, so we use [1]
          currentState: {
            name: censusStateJson[1][0],
            pop: censusStateJson[1][1],
            density: censusStateJson[1][2],
            code: censusStateJson[1][3]
          }
        })
      } catch(err) {
        console.log(err);
      }
    } else {
      try {
        const searchedGeo = await fetch('http://localhost:9000/api/v1/census/placeSearch/' + search.searchText);
        const parsedResponse = await searchedGeo.json();
        this.setState({
          //array of all matching places
          currentPlaces: parsedResponse.data
        })
      } catch(err) {
        console.log(err);
      }
    }
  }

  saveState = async (e) => {
    //calls state post route
    e.preventDefault();
    try {
      const savedState = await fetch('http://localhost:9000/api/v1/census/state', {
        method: 'POST',
        body: JSON.stringify(this.state.currentState),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await savedState.json();
      this.setState({
        userStates: [...this.state.userStates, parsedResponse.data]
      });
    } catch(err) {
      console.log(err);
    }
  }

  savePlace = async (place, e) => {
    e.preventDefault();
    try {
      const savedPlace = await fetch('http://localhost:9000/api/v1/census/place', {
        method: 'POST',
        body: JSON.stringify(place),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await savedPlace.json();
      this.setState({
        userPlaces: [...this.state.userPlaces, parsedResponse.data]
      });
    } catch(err) {
      console.log(err);
    }
  }

  deleteState = async (id) => {
    try {
      const deletedState = await fetch('http://localhost:9000/api/v1/census/state/' + id, {
        method: 'DELETE'
      });
      const deletedStateJson = await deletedState.json();
      const updatedStateList = this.state.userStates.filter((el) => {
        return el._id !== id
      })
      this.setState({
        userStates: updatedStateList
      })
    } catch(err) {
      console.log(err);
    }
  }

  deletePlace = async (id) => {
    try {
      const deletedPlace = await fetch('http://localhost:9000/api/v1/census/place/' + id, {
        method: 'DELETE'
      });
      const deletedPlaceJson = await deletedPlace.json();
      const updatedPlaceList = this.state.userPlaces.filter((el) => {
        return el._id !== id
      });
      this.setState({
        userPlaces: updatedPlaceList
      })
    } catch(err) {
      console.log(err);
    }
  }

  componentDidMount(){
    console.log(this.state, 'cdm');
    this.getUserStates().then((userStates) => {
      this.setState({userStates: userStates})
    }).catch((err) => {
      console.log(err);
    });
    this.getUserPlaces().then((userPlaces) => {
      this.setState({userPlaces: userPlaces})
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <div id="textContainer">
          <StateContainer
            currentState={this.state.currentState}
            currentPlaces={this.state.currentPlaces}
            showState={this.state.showState}
            userStates={this.state.userStates}
            userPlaces={this.state.userPlaces}
            saveState={this.saveState}
            savePlace={this.savePlace}
            deleteState={this.deleteState}
            deletePlace={this.deletePlace} />
          <SearchContainer geoSearch={this.geoSearch} />
        </div>
        <div>
          <GameContainer />
          <MapContainer 
            currentState={this.state.currentState} geoSearch={this.geoSearch} />
        </div>
      </div>
    );
  }
}

export default App;
