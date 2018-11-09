import React, {Component} from 'react';

class SearchContainer extends Component {
	constructor(){
		super();
		this.state = {
			searchText: '',
			searchType: 'State'
		}
	}
	updateSearch = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		});
	}
	render(){
		return (
			<div>
				<h2>SearchContainer</h2>
				<form onSubmit={this.props.geoSearch.bind(null, this.state)}>
					<label>
						Search Type: 
						<select name='searchType' value={this.state.searchType} onChange={this.updateSearch}>
							<option>State</option>
							<option>City</option>
						</select>
					</label><br/>
					<label>
						Search: 
						<input type='text' name='searchText' value={this.state.searchText} onChange={this.updateSearch}/>
					</label><br/>
					<button type='Submit'>Search</button>
				</form>
			</div>
		)
	}
}

export default SearchContainer