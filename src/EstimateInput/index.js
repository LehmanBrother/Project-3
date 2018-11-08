import React from 'react';

const EstimateInput = (props) => {
	return (
		<form onSubmit={props.submitEstimate}>
			<input type='number' name='estimateInput' value={props.estimateInput} onChange={props.handleEstimateInputChange} />
			<button type='submit'>Submit Answer</button>
		</form>
	)
}

export default EstimateInput