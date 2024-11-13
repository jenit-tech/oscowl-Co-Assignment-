import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    editing: false,
    updatedTitle: '',
  }

  onChangeTitle = event => {
    this.setState({updatedTitle: event.target.value})
  }

  onEditTitle = () => {
    const {todoDetails} = this.props
    this.setState({editing: true, updatedTitle: todoDetails.title})
  }

  onSaveTodo = () => {
    this.setState({editing: false})
  }

  render() {
    const {todoDetails, deleteTodo, completeTodo} = this.props
    const {editing, updatedTitle} = this.state
    return (
      <li className="todo-item">
        {editing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={this.onChangeTitle}
              className='updating-input'
            />
            <button
              onClick={this.onSaveTodo}
              type="button"
              className="save-button"
            >
              Save
            </button>
          </>
        ) : (
          <>
          <div className='card-one'>
          <input
              type="checkbox"
              checked={todoDetails.completed}
              onChange={() => completeTodo(todoDetails.id)}
              className='checkbox'
            />
            <p className="title">{todoDetails.title}</p>

          </div>
          <div className='card-two'>
          <button
              onClick={() => deleteTodo(todoDetails.id)}
              type="button"
              className="delete-button"
            >
              Delete
            </button>
            <button
              type="button"
              className="edit-button"
              onClick={this.onEditTitle}
            >
              Edit
            </button>
          </div>
            
            
          </>
        )}
      </li>
    )
  }
}

export default TodoItem