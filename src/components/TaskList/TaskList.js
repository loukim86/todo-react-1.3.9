import React from 'react';
import Task from "../Task/Task";
import './TaskList.css';

export default class TaskList extends React.Component {
  state = {
    value: '',
  }

  onToggleClick = (text, id) => {
    this.setState({ value: text });
    this.props.onUpdateStatusTask(id);
  };
  

  onToggle = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e, id) => {
    e.preventDefault();
    if (this.state.value !== '') {
      this.props.onEditTask(id, this.state.value);
      this.setState({ value: '' }); 
  };
};

  render() {
    const { taskData, onToggle, onDelete } = this.props;
    const taskTodo = taskData.map((item) => {
      const {id, state, ...itemProps} = item;
      return (
        <li key={id} className={state}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={state === 'completed' ? true : false}
            onChange={() => onToggle(id)}
          />
          <label><Task taskItem={itemProps} /></label>
          <button className="icon icon-edit" onClick={() => this.onToggleClick(itemProps.description, id)}></button>
          <button className="icon icon-destroy" onClick={() => onDelete(item.id)}></button>
        </div>
        {state === 'editing' ? (
          <form onSubmit={(e) => this.onSubmit(e, id)} itemId={id}>
            <input type="text"
            className='edit'
            value={this.state.value}
            onChange={this.onToggle} />
          </form>
        ) : null}
      </li>
      )
    });
  
    return (
      <ul className="todo-list">
        {taskTodo}
      </ul>
    )
   };
  };

