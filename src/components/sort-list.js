import React from 'react';


export default class SortList extends React.Component {

	render() {
		return (
			<div>
				<h1>Which do you prefer?</h1>
				<h2>A. {this.props.listToSort[0]}</h2>
				<h1>OR</h1>
				<h2>B. {this.props.listToSort[1]}</h2>
			</div>
		);
	}

	
}