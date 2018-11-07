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
	getGeos(){
		//based on user selection, return geo or geo1 and geo2

	}
	componentDidMount(){
		//
	}
	render(){
		console.log(this.state.estimateOrComparison, 'tseoc');
		console.log(this.state.densityOrPop, 'tsdop');
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
			questionText = questionPart1 + '[geo]' + '?';
		} else {
			questionText = questionPart1 + '[geo1]' + ' or ' + '[geo2]' + '?';
		}
		return(
			<span className="gameSpan" id="questionContainer">
				<form>
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