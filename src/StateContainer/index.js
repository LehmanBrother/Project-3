import React, {Component} from 'react';
import CurrentStateContainer from '../CurrentStateContainer';
import CurrentPlaceContainer from '../CurrentPlaceContainer';

class StateContainer extends Component {
	render(){
		const userStates = this.props.userStates.map((userState, i) => {
			return (
				<li key={userState._id}>
					<h5>{userState.name}</h5>
					<p>Population: {userState.pop}</p>
					<p>Density: {Math.round(10*userState.density)/10}/sq mi</p>
					<button onClick={this.props.deleteState.bind(null,userState._id)}>Delete State</button>
				</li>
			)
		})
		const userPlaces = this.props.userPlaces.map((userPlace, i) => {
			return (
				<li key={userPlace._id}>
					<h5>{userPlace.name}</h5>
					<p>Population: {userPlace.pop}</p>
					<p>Density: {Math.round(10*userPlace.density)/10}/sq mi</p>
					<button onClick={this.props.deletePlace.bind(null,userPlace._id)}>Delete City</button>
				</li>
			)
		})
		return (
			<div>
				{this.props.showState ?
					<CurrentStateContainer
						currentState={this.props.currentState}
						saveState={this.props.saveState} /> :
					<CurrentPlaceContainer
						currentPlaces={this.props.currentPlaces}
						savePlace={this.props.savePlace}
						 />
						}
				<h2>StateContainer</h2>
				<div>
					<h3>Saved States</h3>
					<ul>
						{userStates}
					</ul>
				</div>
				<h2>PlaceContainer</h2>
				<div>
					<h3>Saved Cities</h3>
					<ul>
						{userPlaces}
					</ul>
				</div>
			</div>
		)
	}
}

export default StateContainer