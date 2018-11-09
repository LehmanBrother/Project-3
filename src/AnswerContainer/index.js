import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';
import EstimateInput from '../EstimateInput';
import ComparisonInput from '../ComparisonInput';

class AnswerContainer extends Component {
	constructor(){
		super();
		this.state = {
			estimateInput: '',
			comparisonInput: 'Geo 1'
		}
	}
	handleEstimateInputChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleComparisonInputChange = async (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	submitEstimate = (e) => {
		e.preventDefault();
		this.props.evaluateEstimate(this.state.estimateInput)
	}
	submitComparison = async (e) => {
		e.preventDefault();
		this.props.evaluateComparison(this.state.comparisonInput)
	}
	render(){
		let estimateInputModal;
		if(this.props.estimateOrComparison === 'Estimate') {
			estimateInputModal = true
		} else if(this.props.estimateOrComparison === 'Comparison') {
			estimateInputModal = false
		}
		return(
			<Grid.Column id="answerContainer">
				<h3>Your Answer</h3>
				{estimateInputModal ? 
					<EstimateInput
						estimateInput={this.state.estimateInput}
						handleEstimateInputChange={this.handleEstimateInputChange}
						submitEstimate={this.submitEstimate} /> :
					<ComparisonInput
						comparisonInput={this.state.comparisonInput}
						handleComparisonInputChange={this.handleComparisonInputChange}
						submitComparison={this.submitComparison}
					/>
				}
			</Grid.Column>
		)
	}
}

export default AnswerContainer