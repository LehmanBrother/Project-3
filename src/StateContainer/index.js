import React, {Component} from 'react';

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
				<p>StateContainer</p>
				<p>Current State:</p>
				<ul>
					<li>Name: {this.props.currentState.name}</li>
					<li>Population: {this.props.currentState.pop}</li>
					<li>Density: {Math.round(10*this.props.currentState.density)/10}/sq mi</li>
				</ul>
				<form onSubmit={this.props.saveState}>
					<button type='Submit'>Save State</button>
				</form>
				<div>
					<h3>Saved States</h3>
					<ul>
						{userStates}
					</ul>
				</div>
			</div>
		)
	}
}

export default StateContainer