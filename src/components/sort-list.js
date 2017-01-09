import React from 'react';
import _ from 'lodash';

var test = 0;
var position = 0;
var count = 0;
var startPosition = 0;
var gap = 0;
var listLength = 0;

export default class SortList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mode: this.props.mode,
			listToSort: this.props.listToSort,
			error: null,
			userChoice: '',
			choiceA: '',
			choiceB: '',
		};
	}



	prepareSort(alist) {
		var initialGap = Math.floor(alist.length/2);
		this.setState({ choiceA: alist[0] });
		this.setState({ choiceB: alist[initialGap] });
		position = initialGap;
 		count = initialGap;
		gap = initialGap;
		listLength = alist.length;

	}

	nextSort(alist, choice, counter, gap) {


		if (choice == 'b') {
			alist[counter] = this.state.choiceA;
			var newcounter = counter - gap;
			alist[newcounter] = this.state.choiceB;
			this.setState({ 
				listToSort: alist
			});
			count = newcounter;
		}

	}

	checkPosition(pos) {
		if (pos >= listLength) {
			startPosition += 1;
			if (startPosition >= gap) {
				gap = Math.floor(gap/2);
				this.checkIfDisplay(gap);
				startPosition = 0;
			};
			
			position = startPosition + gap;
		}
	}

	checkIfDisplay(gap) {
		if (gap <= 0) {
			this.props.displayFinal();
		}
	}


	chooseItem(event) {
		event.preventDefault();

		const choice = this.refs.itemChoice.value; //user Input
		const validateInput = this.validateInput(choice);

		if (validateInput) {
			this.setState({ error: validateInput });
			return;
		}

		this.setState({ error: null });
		this.setState({ userChoice: choice });

		this.nextSort(this.state.listToSort, choice, count, gap);
		var alist = this.state.listToSort;



		if (gap > 0) {
			if (position < listLength) {
				if (count < gap || choice == 'a') {
					position += gap;
					this.checkPosition(position);
					count = position;
					this.setState({ choiceA: alist[count - gap]});
					this.setState({ choiceB: alist[count]});
		
				} else if (count >= gap) {
					this.setState({ choiceA: alist[count - gap]});
					this.setState({ choiceB: alist[count]});

				}
			}
		}
		


		this.refs.itemChoice.value = '';
	}

	validateInput(choice) {
		if (!choice || (choice != 'A' && choice != 'B' && choice != 'a' && choice != 'b')) {
			return 'Please enter A or B';
		} else {
			return null;
		}
	}

	renderError() {
		if (!this.state.error) {
			return null;
		}

		return <div style={{ color: 'red'}}>{this.state.error}</div>
	}

	render() {

		return (
			<div>
				<h1>Which do you prefer?</h1>
				<h2>a. {this.state.choiceA}</h2>
				<h2>b. {this.state.choiceB}</h2>
				<form onSubmit={this.chooseItem.bind(this)}>
					<input type='text' placeholder='a or b?' ref='itemChoice' />
				</form>
				{this.renderError()}
				<br />
			</div>
		);
	}

	componentDidMount() {
		this.prepareSort(this.state.listToSort);
	}

	
}