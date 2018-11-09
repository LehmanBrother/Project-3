import React from 'react';
import { Button } from 'semantic-ui-react';


const EstimateInput = (props) => {
	return (
		<form onSubmit={props.submitEstimate}>
			<input type='number' name='estimateInput' value={props.estimateInput} onChange={props.handleEstimateInputChange} placeholder="estimate"/>	
			<Button id="button" basic color='blue' type='submit'>Submit Answer</Button>
		</form>
	)
}

export default EstimateInput