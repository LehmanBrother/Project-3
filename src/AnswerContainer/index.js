import React, {Component} from 'react';
import EstimateInput from '../EstimateInput';

class AnswerContainer extends Component {
	constructor(){
		super();
		this.state = {
			estimateInput: ''
		}
	}
	render(){
		let estimateInputModal;
		if(this.props.estimateOrComparison === 'Estimate') {
			estimateInputModal = true
		} else {
			estimateInputModal = false
		}
		console.log(estimateInputModal, 'eim');
		return(
			<span className="gameSpan" id="answerContainer">
				<p>Answer Container</p>
				<p>{this.props.estimateOrComparison}</p>
				{estimateInputModal ? 
					<EstimateInput estimateInput={this.state.estimateInput} /> :
					<p>Comparison Input</p>
				}
			</span>
		)
	}
}

export default AnswerContainer