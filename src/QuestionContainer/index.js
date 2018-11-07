import React, {Component} from 'react';

class QuestionContainer extends Component {
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return(
			<span class="gameSpan" id="questionContainer">
				<p>Question Container</p>
				<h5>Current Question:</h5>
				<p>[question text]</p>
			</span>
		)
	}
}

export default QuestionContainer