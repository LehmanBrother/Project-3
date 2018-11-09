import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';

class CurrentPlaceContainer extends Component {
	constructor() {
		super();
		this.state = {

		}
	}
	render() {
		console.log(this.props, 'cpc this.props');
		const currentPlaces = this.props.currentPlaces.map((place, i) => {
			return (
				<li key={place._id}>
					<h5>{place.name}</h5>
					<p>Population: {place.pop}</p>
					<p>Density: {Math.round(10*place.density)/10}/sq mi</p>
					<form onSubmit={this.props.savePlace.bind(null,place)}>
						<Button basic color='blue' id="button" type='Submit'>Save City</Button>
					</form>
				</li>
			)
		})
		return (
			<div>
				<h3>Current Place</h3>
				<ul>
					{currentPlaces}
				</ul>
			</div>
		)
	}
}

export default CurrentPlaceContainer