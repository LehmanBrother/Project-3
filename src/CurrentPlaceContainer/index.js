import React, {Component} from 'react';

class CurrentPlaceContainer extends Component {
	render() {
		const currentPlaces = this.props.currentPlaces.map((place, i) => {
			return (
				<li key={place._id}>
					<h5>{place.name}</h5>
					<p>Population: {place.pop}</p>
					<p>Density: {Math.round(10*place.density)/10}/sq mi</p>
					<form onSubmit={this.props.savePlace.bind(null,place)}>
						<button type='Submit'>Save City</button>
					</form>
				</li>
			)
		})
		return (
			<div>
				<h3>CurrentPlaceContainer</h3>
				<p>Current Cities:</p>
				<ul>
					{currentPlaces}
				</ul>
			</div>
		)
	}
}

export default CurrentPlaceContainer