import React, {Component} from 'react';
import QuestionContainer from '../QuestionContainer';
import AnswerContainer from '../AnswerContainer';

class GameContainer extends Component {
	constructor(){
		super();
		this.state = {
			estimateOrComparison: ''
		}
	}
	editAnswerContainer = (questionState) => {
		console.log(questionState, 'qs');
		this.setState({
			estimateOrComparison: questionState.estimateOrComparison
		})
	}
	render(){
		//GameContainer should contain the following:
			//QuestionContainer: allows user to select type of question, displays current question
			//AnswerContainer: depending on type of question, allows user to type in response or select from list of answers and submit
		return(
			<div id="gameContainer">
				<span className="gameSpan">
					<h3>GameContainer</h3>
				</span>
				<QuestionContainer
					editAnswerContainer={this.editAnswerContainer} />
				<AnswerContainer
					estimateOrComparison={this.state.estimateOrComparison} />
			</div>
		)
	}
}

export default GameContainer