import React, {Component} from 'react';
import { Button, Card } from 'semantic-ui-react';
import CurrentStateContainer from '../CurrentStateContainer';
import CurrentPlaceContainer from '../CurrentPlaceContainer';



class StateContainer extends Component {
	render(){
		const userStates = this.props.userStates.map((userState, i) => {
			return (
				<Card key={userState._id}>
					<Card.Content>
						<Card.Header>{userState.name}</Card.Header>
						<p>Population: {userState.pop}</p>
						<p>Density: {Math.round(10*userState.density)/10}/sq mi</p>
						<Button basic color='blue' id="button" onClick={this.props.deleteState.bind(null,userState._id)}>Delete State</Button>
					</Card.Content>
				</Card>
			)
		})
		const userPlaces = this.props.userPlaces.map((userPlace, i) => {
			return (
				<Card key={userPlace._id}>
					<Card.Content>
						<Card.Header>{userPlace.name}</Card.Header>
						<p>Population: {userPlace.pop}</p>
						<p>Density: {Math.round(10*userPlace.density)/10}/sq mi</p>
						<Button basic color='blue' id="button" onClick={this.props.deletePlace.bind(null,userPlace._id)}>Delete City</Button>
					</Card.Content>
				</Card>
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
				<h2>Saved States</h2>
				<div className="userSaved">
					<Card.Group>
						{userStates}
					</Card.Group>
				</div>
				<h2>Saved Cities</h2>
				<div className="userSaved">
					<Card.Group>
						{userPlaces}
					</Card.Group>
				</div>
			</div>
		)
	}
}

export default StateContainer