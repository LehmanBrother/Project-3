import React, {Component} from 'react';
import QuestionContainer from '../QuestionContainer';
import AnswerContainer from '../AnswerContainer';
import { Grid } from 'semantic-ui-react';


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
			questionAnswered: false,
			avgPctDif: null,
			pctCorrect: null,
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
		let pctDif;
		if(this.state.densityOrPop === 'Population') {
			pctDif = Math.round(1000*Math.abs(this.state.questionGeo.pop - userEstimate)/this.state.questionGeo.pop)/10
			await this.setState({
				correctAnswer: this.state.questionGeo.pop
			})
			console.log(this.state.currentPctDif, 'tscpd');
		} else if(this.state.densityOrPop === 'Density') {
			pctDif = Math.round(1000*Math.abs(this.state.questionGeo.density - userEstimate)/this.state.questionGeo.density)/10
			await this.setState({
				correctAnswer: Math.round(10*this.state.questionGeo.density)/10
			})
			console.log(this.state.currentPctDif, 'tscpd');
		}
		await this.setState({
			currentPctDif: pctDif,
			questionAnswered: true
		});
		//call answer post route
		try {
			const newAnswer = await fetch('http://localhost:9000/api/v1/census/answer', {
				method: 'POST',
				body: JSON.stringify({
					type: this.state.estimateOrComparison,
					isCorrect: 0,
					pctDif: pctDif
				}),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await newAnswer.json();
			console.log(parsedResponse, 'parsedResponse');
		} catch(err) {
			console.log(err);
		}
	}
	evaluateComparison = async (comparisonInput) => {
		console.log('ec called');
		let pctDif;
		let isCorrect;
		if(this.state.densityOrPop === 'Population') {
			pctDif = Math.round(1000*Math.abs(this.state.questionGeo1.pop - this.state.questionGeo2.pop)/this.state.lowerValGeo.pop)/10
		} else if(this.state.densityOrPop === 'Density') {
			pctDif = Math.round(1000*Math.abs(this.state.questionGeo1.density - this.state.questionGeo2.density)/this.state.lowerValGeo.density)/10
		}
		if(comparisonInput === this.state.higherValId) {
			isCorrect = 1;
		} else {
			isCorrect = 0;
		}
		await this.setState({
			correctAnswer: this.state.higherValGeo.name,
			currentPctDif: pctDif,
			questionAnswered: true
		})
		//call answer post route
		try {
			const newAnswer = await fetch('http://localhost:9000/api/v1/census/answer', {
				method: 'POST',
				body: JSON.stringify({
					type: this.state.estimateOrComparison,
					isCorrect: isCorrect,
					pctDif: pctDif
				}),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await newAnswer.json();
			console.log(parsedResponse, 'parsedResponse');
		} catch(err) {
			console.log(err);
		}
	}
	aggregateEstimates = async () => {
		try {
			const estAgg = await fetch('http://localhost:9000/api/v1/census/answer/est');
			const estAggJson = await estAgg.json();
			console.log(estAggJson.data[0].avgPctDif, 'apd');
			return estAggJson.data[0].avgPctDif;
		} catch(err) {
			console.log(err);
		}
	}
	aggregateComparisons = async () => {
		try {
			const compAgg = await fetch('http://localhost:9000/api/v1/census/answer/comp');
			const compAggJson = await compAgg.json();
			console.log(compAggJson.data[0].pctCorrect, 'ac');
			return compAggJson.data[0].pctCorrect;
		} catch(err) {
			console.log(err);
		}
	}
	componentDidMount(){
		//call answer aggregator, set state accordingly
		this.aggregateEstimates().then((avgPctDif) => {
			this.setState({avgPctDif: avgPctDif})
		}).catch((err) => {
			console.log(err);
		});
		this.aggregateComparisons().then((pctCorrect) => {
			this.setState({pctCorrect: pctCorrect})
		}).catch((err) => {
			console.log(err);
		});
	}
	render(){

		return(
			<Grid columns='equal' id="gameContainer">
				<QuestionContainer
					editAnswerContainer={this.editAnswerContainer}
					updateQuestionGeos={this.updateQuestionGeos} />
				<AnswerContainer
					estimateOrComparison={this.state.estimateOrComparison}
					evaluateEstimate={this.evaluateEstimate}
					evaluateComparison={this.evaluateComparison} />
				<Grid.Column id="gameSpan">
					<h3>Your Score</h3>
					{this.state.questionAnswered ?
						<label>
							<p>Correct answer: {this.state.correctAnswer}</p>
							<p>Difference: {this.state.currentPctDif}%</p>
						</label> :
						<div id="blankAnswer"></div>
					}
					<p>Percent Correct: {Math.round(1000*this.state.pctCorrect)/10}%</p>
					<p>Average Estimate Variance: {Math.round(10*this.state.avgPctDif)/10}%</p>
				</Grid.Column>				
			</Grid>
		)
	}
}

export default GameContainer