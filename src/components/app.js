import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import SortList from './sort-list'

const todos = [
{
	task: 'make React tutorial',
	isCompleted: false
},
{
	task: 'eat dinner',
	isCompleted: true
}
];

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: todos,
			mode: 'isBuilding',
			listToSort: []
		};
	}

	renderMainSection() {
		if (this.state.mode === 'isBuilding') {
			return (
				<div>
					<CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)}/>
					<TodosList 
					todos={this.state.todos}
					toggleTask={this.toggleTask.bind(this)}
					saveTask={this.saveTask.bind(this)}
					deleteTask={this.deleteTask.bind(this)}
					/>
					<button onClick={this.saveList.bind(this)}>Begin</button>
				</div>
			);
		} 
		return (
			<div>
				<SortList listToSort={this.state.listToSort} mode={this.state.mode}/>
				<button onClick={this.startOver.bind(this)}>Start Over</button>
			</div>
		);
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
		this.setState({ mode: 'isSorting' });
		this.state.listToSort = listToSort;
	}

	startOver() {
		this.setState({ mode: 'isBuilding' });
	}
}