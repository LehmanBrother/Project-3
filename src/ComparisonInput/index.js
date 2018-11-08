import React from 'react';

const ComparisonInput = (props) => {
	return (
		<form onSubmit={props.submitComparison}>
			<select name='comparisonInput' value={props.comparisonInput} onChange={props.handleComparisonInputChange}>
				<option>Geo 1</option>
				<option>Geo 2</option>
			</select>
			<button type='submit'>Submit Answer</button>
		</form>
	)
}

export default ComparisonInput