import React, {Component} from 'react';

class QuestionContainer extends Component {
	constructor(){
		super();
		this.state = {
			estimateOrComparison: 'Estimate',
			densityOrPop: 'Population',
			stateOrPlace: 'States Only',
			geo: '',
			geo1: '',
			geo2: ''
		}
	}
	updateQuestion = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		});
	}
	getGeos = async (e) => {
		//based on user selection, return geo or geo1 and geo2
		e.preventDefault();
		console.log('getGeos called');
		if(this.state.stateOrPlace === 'States Only') {
			try {
				const randStates = await fetch('http://localhost:9000/api/v1/census/question/state');
				const randStatesJson = await randStates.json();
				console.log(randStatesJson.data);
				if(this.state.estimateOrComparison === 'Estimate') {
					this.setState({
						geo: randStatesJson.data[0]
					})
				} else {
					this.setState({
						geo1: randStatesJson.data[0],
						geo2: randStatesJson.data[1]
					})
				}
				console.log(this.state);
			} catch(err) {
				console.log(err);
			}
		} else if(this.state.stateOrPlace === 'Cities Only') {
			try {
				const randPlaces = await fetch('http://localhost:9000/api/v1/census/question/place');
				const randPlacesJson = await randPlaces.json();
				console.log(randPlacesJson.data);
				if(this.state.estimateOrComparison === 'Estimate') {
					this.setState({
						geo: randPlacesJson.data[0]
					})
				} else {
					this.setState({
						geo1: randPlacesJson.data[0],
						geo2: randPlacesJson.data[1]
					})
				}
				console.log(this.state);
			} catch(err) {
				console.log(err);
			}
		}
	}
	componentDidMount(){
		//
	}
	render(){
		let questionType1 = this.state.estimateOrComparison;
		let questionType2 = this.state.densityOrPop;
		let questionPart1;
		if(questionType1 === 'Estimate') {
			if(questionType2 === 'Population') {
				questionPart1 = 'What is the population of ';
			} else {
				questionPart1 = 'What is the population density of ';
			}
		} else {
			if(questionType2 === 'Population') {
				questionPart1 = 'Which has a higher population: '
			} else {
				questionPart1 = 'Which has a higher population density: '
			}
		}
		let questionText;
		if(questionType1 === 'Estimate') {
			questionText = questionPart1 + this.state.geo.name + '?';
		} else {
			questionText = questionPart1 + this.state.geo1.name + ' or ' + this.state.geo2.name + '?';
		}
		return(
			<span className="gameSpan" id="questionContainer">
				<form onSubmit={this.getGeos}>
					<select name='estimateOrComparison' value={this.state.estimateOrComparison} onChange={this.updateQuestion}>
						<option>Estimate</option>
						<option>Comparison</option>
					</select>
					<select name='densityOrPop' value={this.state.densityOrPop} onChange={this.updateQuestion}>
						<option>Population</option>
						<option>Density</option>
					</select>
					<select name='stateOrPlace' value={this.state.stateOrPlace} onChange={this.updateQuestion}>
						<option>States Only</option>
						<option>Cities Only</option>
						<option>States and Cities</option>
					</select>
					<button type='Submit'>Get New Question</button>
				</form>
				<h3>Question Container</h3>
				<h5>Current Question:</h5>
				<p>{questionText}</p>
			</span>
		)
	}
}

//User selects:
	//Population or density
	//Estimate or comparison
	//Only states, only places, or either

//What is the population of [geo]?
//What is the population density of [geo]?
//Which has a higher population: [geo1] or [geo2]?
//Which has a higher population density: [geo1] or [geo2]?

export default QuestionContainer