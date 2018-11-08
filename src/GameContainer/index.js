import React, {Component} from 'react';
import QuestionContainer from '../QuestionContainer';
import AnswerContainer from '../AnswerContainer';

class GameContainer extends Component {
	constructor(){
		super();
		this.state = {
			estimateOrComparison: 'Estimate',
			densityOrPop: '',
			questionGeo: '',
			questionGeo1: '',
			questionGeo2: '',
			higherValGeo: '',
			higherValId: '',
			lowerValGeo: '',
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
		let higherValGeo;
		let higherValId;
		let lowerValGeo;
		if(this.state.estimateOrComparison === 'Comparison') {
			if(this.state.densityOrPop === 'Population') {
				if(geo1.pop > geo2.pop) {
					higherValGeo = geo1;
					higherValId = 'Geo 1';
					lowerValGeo = geo2;
				} else if(geo1.pop < geo2.pop) {
					higherValGeo = geo2;
					higherValId = 'Geo 2';
					lowerValGeo = geo1;
				}
			} else if(this.state.densityOrPop === 'Density') {
				if(geo1.density > geo2.density) {
					higherValGeo = geo1;
					higherValId = 'Geo 1';
					lowerValGeo = geo2;
				} else if(geo1.density < geo2.density) {
					higherValGeo = geo2;
					higherValId = 'Geo 2';
					lowerValGeo = geo1;
				}
			}
			this.setState({
				higherValGeo: higherValGeo,
				higherValId: higherValId,
				lowerValGeo: lowerValGeo
			})
		}
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
	evaluateComparison = async (comparisonInput) => {
		console.log('ec called');
		console.log(comparisonInput, 'ec ci');
		let pctDif;
		if(this.state.densityOrPop === 'Population') {
			pctDif = Math.round(1000*Math.abs(this.state.questionGeo1.pop - this.state.questionGeo2.pop)/this.state.lowerValGeo.pop)/10
		} else if(this.state.densityOrPop === 'Density') {
			pctDif = Math.round(1000*Math.abs(this.state.questionGeo1.density - this.state.questionGeo2.density)/this.state.lowerValGeo.density)/10
		}
		this.setState({
			correctAnswer: this.state.higherValGeo.name,
			currentPctDif: pctDif,
			questionAnswered: true
		})
	}
	render(){

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
					evaluateEstimate={this.evaluateEstimate}
					evaluateComparison={this.evaluateComparison} />
			</div>
		)
	}
}

export default GameContainer