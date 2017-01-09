import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import SortList from './sort-list'

const todos = [
{
	task: '9',
	isCompleted: false
},
{
	task: '5',
	isCompleted: true
},
{
	task: '3'
},
{
	task: '6'
},
{
	task: '8'
},
{
	task: '1'
},
{
	task: '4'
},
{
	task: '2'
},
{
	task: '7'
}
];

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.displayFinal = this.displayFinal.bind(this);

		this.state = {
			todos: todos,
			mode: 'isBuilding',
			listToSort: [],
			error: null
		};
	}

	renderMainSection() {
		if (this.state.mode === 'isBuilding') {
			return (
				<div>
					<CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)}/>
					<br />
					<TodosList 
					todos={this.state.todos}
					toggleTask={this.toggleTask.bind(this)}
					saveTask={this.saveTask.bind(this)}
					deleteTask={this.deleteTask.bind(this)}
					/>
					{this.renderError()}
					<br />
					<button onClick={this.saveList.bind(this)}>Begin</button>
				</div>
			);
		}  else if (this.state.mode === 'isSorting') {
			return (
				<div>
					<SortList listToSort={this.state.listToSort} mode={this.state.mode} displayFinal={this.displayFinal}/>
					<button onClick={this.startOver.bind(this)}>Start Over</button>
				</div>
			);
		} else if (this.state.mode === 'isDisplaying') {
			return (
				<div>
					{this.renderFinalList()}
					<button onClick={this.startOver.bind(this)}>Start Over</button>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<h1>Ranker</h1>	
				{this.renderMainSection()}
			</div>
		);
	}

	toggleTask(task) {
		const foundTodo = _.find(this.state.todos, todo => todo.task === task);
		foundTodo.isCompleted = !foundTodo.isCompleted;
		this.setState({ todos: this.state.todos });
	}

	createTask(task) {
		this.state.todos.push({
			task,
			isCompleted: false
		});
		this.setState({ todos: this.state.todos });
	}

	saveTask(oldTask, newTask) {
		const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
		foundTodo.task = newTask;
		this.setState({ todos: this.state.todos });
	}

	deleteTask(taskToDelete) {
		_.remove(this.state.todos, todo => todo.task === taskToDelete);
		this.setState({ todos: this.state.todos}); 
	}

	saveList() {
		const listToSort = todos.map(function(x) {return x['task']}); 
		this.state.listToSort = listToSort;
		const validateInput = this.validateInput(this.state.listToSort.length);

		if (validateInput) {
			this.setState({ error: validateInput });
			return;
		}

		this.setState({ error: null });
		this.setState({ mode: 'isSorting' });


	}

	validateInput(length) {
		if (length < 2) {
			return 'Please enter at least 2 items.'
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

	startOver() {
		this.setState({ mode: 'isBuilding' });
	}

	displayFinal() {
		this.setState({ mode: 'isDisplaying' });
	}

	renderFinalList() {
		return (
			<ol>
				{this.state.listToSort.map(function(item, index) {
					return <li key={index}>{item}</li>; 
				})}
			</ol>
		);
	}
}