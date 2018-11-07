import React, {Component} from 'react';
import QuestionContainer from '../QuestionContainer';
import AnswerContainer from '../AnswerContainer';

class GameContainer extends Component {
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		//GameContainer should contain the following:
			//QuestionContainer: allows user to select type of question, displays current question
			//AnswerContainer: depending on type of question, allows user to type in response or select from list of answers and submit
		return(
			<div id="gameContainer">
				<span class="gameSpan">
					<h3>GameContainer</h3>
				</span>
				<QuestionContainer />
				<AnswerContainer />
			</div>
		)
	}
}

//Geo types:
	//State
	//Place w/pop >= 100,000

//Question types:
	//Guess pop
	//Compare pop
	//Guess density
	//Compare density

export default GameContainer