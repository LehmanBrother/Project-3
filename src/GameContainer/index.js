import React, {Component} from 'react';
import QuestionContainer from '../QuestionContainer';
import AnswerContainer from '../AnswerContainer';

class GameContainer extends Component {
	constructor(){
		super();
		this.state = {
			estimateOrComparison: '',
			densityOrPop: '',
			questionGeo: '',
			questionGeo1: '',
			questionGeo2: '',
			currentPctDif: 0,
			correctAnswer: '',
			questionAnswered: false
		}
	}
	editAnswerContainer = (questionState) => {
		console.log(questionState, 'qs');
		this.setState({
			estimateOrComparison: questionState.estimateOrComparison,
			densityOrPop: questionState.densityOrPop
		})
	}
	updateQuestionGeos = (geo, geo1, geo2) => {
		this.setState({
			questionGeo: geo,
			questionGeo1: geo1,
			questionGeo2: geo2
		});
		console.log(this.state, 'uqg state');
	}
	evaluateEstimate = async (userEstimate) => {
		console.log('ee called');
		if(this.state.densityOrPop === 'Population') {
			const pctDif = Math.round(1000*Math.abs(this.state.questionGeo.pop - userEstimate)/this.state.questionGeo.pop)/10
			await this.setState({
				correctAnswer: this.state.questionGeo.pop,
				currentPctDif: pctDif,
				questionAnswered: true
			})
			console.log(this.state.currentPctDif, 'tscpd');
		} else if(this.state.densityOrPop === 'Density') {
			const pctDif = Math.round(1000*Math.abs(this.state.questionGeo.density - userEstimate)/this.state.questionGeo.density)/10
			await this.setState({
				correctAnswer: Math.round(10*this.state.questionGeo.density)/10,
				currentPctDif: pctDif,
				questionAnswered: true
			})
			console.log(this.state.currentPctDif, 'tscpd');
		}
	}
	render(){
		//GameContainer should contain the following:
			//QuestionContainer: allows user to select type of question, displays current question
			//AnswerContainer: depending on type of question, allows user to type in response or select from list of answers and submit

		return(
			<div id="gameContainer">
				<span className="gameSpan">
					<h3>GameContainer</h3>
					{this.state.questionAnswered ?
						<label>
							<p>Correct answer: {this.state.correctAnswer}</p>
							<p>Difference: {this.state.currentPctDif}%</p>
						</label> :
						<p>Result will appear here</p>
					}
				</span>
				<QuestionContainer
					editAnswerContainer={this.editAnswerContainer}
					updateQuestionGeos={this.updateQuestionGeos} />
				<AnswerContainer
					estimateOrComparison={this.state.estimateOrComparison}
					evaluateEstimate={this.evaluateEstimate} />
			</div>
		)
	}
}

export default GameContainer