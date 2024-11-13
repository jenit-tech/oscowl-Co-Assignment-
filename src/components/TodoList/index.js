import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

class TodoList extends Component {
  state = {
    todosList: [
      {
        id: 1,
        title: 'Prepare presentation for Monday meeting',
        completed: false,
      },
      {id: 2, title: 'Grocery shopping for the week', completed: false},
      {id: 3, title: 'Schedule dentist appointment', completed: false},
      {id: 4, title: 'Research for upcoming project', completed: false},
      {id: 5, title: 'Walk the dog at the park', completed: false},
    ],
    newTodoCount: 1,
    newTodoTitle: '',
  }

  changeTodoCount = event => {
    this.setState({
      newTodoCount: event.target.value,
    })
  }

  changeTodoTitle = event => {
    this.setState({
      newTodoTitle: event.target.value,
    })
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const updatedTodoList = todosList.filter(todo => todo.id !== id)
    this.setState({todosList: updatedTodoList})
  }

  completeTodo = id => {
    const {todosList} = this.state
    const updatedTodoList = todosList.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo,
    )
    this.setState({todosList: updatedTodoList})
  }

  handleAddTodo = () => {
    const {newTodoTitle, newTodoCount} = this.state
    const newTodos = Array.from({length: newTodoCount}, (_, i) => ({
      id: Date.now() + i,
      title: newTodoTitle,
      completed: false,
    }))
    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      newTodoTitle: '',
      newTodoCount: 1,
    }))
  }

  render() {
    const {todosList, newTodoTitle, newTodoCount} = this.state
    return (
      <div className="app-container">
        <div className="app-card">
          <h1 className="heading">Simple To-Dos</h1>
          <div className="add-todo">
            <input
              type="number"
              name="newTodoCount"
              value={newTodoCount}
              placeholder="Enter number of todos"
              className="input-field"
              onChange={this.changeTodoCount}
            />
            <input
              type="text"
              name="newTodoTitle"
              value={newTodoTitle}
              placeholder="Enter todo title"
              className="input-field"
              onChange={this.changeTodoTitle}
            />

            <div>
              <button
                type="button"
                className="button"
                onClick={this.handleAddTodo}
              >
                Add
              </button>
            </div>
          </div>
          <ul className="todo-list">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                deleteTodo={this.deleteTodo}
                completeTodo={this.completeTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default TodoList