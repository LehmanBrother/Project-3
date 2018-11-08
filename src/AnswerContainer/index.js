import React, {Component} from 'react';
import EstimateInput from '../EstimateInput';

class AnswerContainer extends Component {
	constructor(){
		super();
		this.state = {
			estimateInput: ''
		}
	}
	handleEstimateInputChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	submitEstimate = (e) => {
		e.preventDefault();
		this.props.evaluateEstimate(this.state.estimateInput)
	}
	render(){
		let estimateInputModal;
		if(this.props.estimateOrComparison === 'Estimate') {
			estimateInputModal = true
		} else {
			estimateInputModal = false
		}
		return(
			<span className="gameSpan" id="answerContainer">
				<p>Answer Container</p>
				<p>{this.props.estimateOrComparison}</p>
				{estimateInputModal ? 
					<EstimateInput
						estimateInput={this.state.estimateInput}
						handleEstimateInputChange={this.handleEstimateInputChange}
						submitEstimate={this.submitEstimate}  /> :
					<p>Comparison Input</p>
				}
			</span>
		)
	}
}

export default AnswerContainer