import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';


class CurrentStateContainer extends Component {
	constructor() {
		super();
		this.state = {

		}
	}
	render() {
		return (
			<div>
				<h3>Current State</h3>
				<ul>
					<li>Name: {this.props.currentState.name}</li>
					<li>Population: {this.props.currentState.pop}</li>
					<li>Density: {Math.round(10*this.props.currentState.density)/10}/sq mi</li>
				</ul>
				<form onSubmit={this.props.saveState}>
					<Button basic color='blue' id="button" type='Submit'>Save State</Button>
				</form>
			</div>
		)
	}
}

export default CurrentStateContainer