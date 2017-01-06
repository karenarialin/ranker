import React from 'react';


export default class SortList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mode: this.props.mode,
			listToSort: this.props.listToSort
		};
	}

	render() {
		return (
			<div>
				<h1>Which do you prefer?</h1>
				<h2>A. {this.state.listToSort[0]}</h2>
				<h1>OR</h1>
				<h2>B. {this.state.listToSort[1]}</h2>
			</div>
		);
	}

	
}