import React, {Component} from 'react';
import CurrentStateContainer from '../CurrentStateContainer';
import CurrentPlaceContainer from '../CurrentPlaceContainer';

class StateContainer extends Component {
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		console.log(this.props, 'stc this.props');
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
		return (
			<div>
				<div>
					{this.props.showState ?
						<CurrentStateContainer
							currentState={this.props.currentState}
							saveState={this.props.saveState} /> :
						<CurrentPlaceContainer
							currentPlaces={this.props.currentPlaces}//add savePlace
							 />}
					<h2>StateContainer</h2>
					<div>
						<h3>Saved States</h3>
						<ul>
							{userStates}
						</ul>
					</div>
				</div>
				<div>
					<h2>PlaceContainer</h2>
				</div>
			</div>
		)
	}
}

export default StateContainer