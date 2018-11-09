import React from 'react';
import { Button } from 'semantic-ui-react';


const ComparisonInput = (props) => {
	return (
		<form onSubmit={props.submitComparison}>
			<select name='comparisonInput' value={props.comparisonInput} onChange={props.handleComparisonInputChange}>
				<option>Geo 1</option>
				<option>Geo 2</option>
			</select>
			<Button basic color='blue' id="button" type='submit'>Submit Answer</Button>
		</form>
	)
}

export default ComparisonInput