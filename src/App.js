import React, { Component } from 'react';
import MapContainer from './MapContainer';
import './App.css';
// import apiKey from './apiKey.js'
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
    e.preventDefault();
    console.log(search.searchType, 'searchType');
    await this.setState({
      showState: search.searchType == 'State'
    });
    console.log(this.state.showState, 'showState');
    if(this.state.showState) {
      console.log('state woo');
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
        console.log(this.state, 'after search');
      } catch(err) {
        console.log(err);
      }
    } else {
      console.log('city woo');
      try {
        const searchedGeo = await fetch('http://localhost:9000/api/v1/census/placeSearch/' + search.searchText);
        const parsedResponse = await searchedGeo.json();
        console.log(parsedResponse.data, 'parsedResponse.data');
        this.setState({
          //array of all matching places
          currentPlaces: parsedResponse.data
        })
        console.log(this.state, 'after search');
      } catch(err) {
        console.log(err);
      }
    }
  }

  saveState = async (e) => {
    //calls state post route
    e.preventDefault();
    console.log('saveState called');
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
      console.log(parsedResponse.data, 'parsedResponse.data');
      this.setState({
        userStates: [...this.state.userStates, parsedResponse.data]
      });
      console.log(this.state.userStates, 'userStates');
    } catch(err) {
      console.log(err);
    }
  }

  savePlace = async (place, e) => {
    e.preventDefault();
    console.log('savePlace called');
    console.log(place, 'place');
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
    console.log(id);
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
    console.log(id);
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
      console.log(userStates, 'cdm userStates');
      this.setState({userStates: userStates})
    }).catch((err) => {
      console.log(err);
    });
    this.getUserPlaces().then((userPlaces) => {
      console.log(userPlaces, 'cdm userPlaces');
      this.setState({userPlaces: userPlaces})
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <MapContainer />
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
    );
  }
}

export default App;
