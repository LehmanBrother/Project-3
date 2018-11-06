import React, {Component} from 'react';

class CurrentStateContainer extends Component {
	constructor() {
		super();
		this.state = {

		}
	}
	render() {
		return (
			<div>
				<h3>CurrentStateContainer</h3>
				<p>Current State:</p>
				<ul>
					<li>Name: {this.props.currentState.name}</li>
					<li>Population: {this.props.currentState.pop}</li>
					<li>Density: {Math.round(10*this.props.currentState.density)/10}/sq mi</li>
				</ul>
				<form onSubmit={this.props.saveState}>
					<button type='Submit'>Save State</button>
				</form>
			</div>
		)
	}
}

export default CurrentStateContainer