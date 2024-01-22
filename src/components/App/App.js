import React from "react";
import Header from "../Header/Header";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { id: 1, state: 'completed', description: 'Completed task', created: 'created 17 seconds ago' },
        { id: 2, state: 'active', description: 'Editing task', created: 'created 5 minutes ago' },
        { id: 3, state: 'active', description: 'Active task', created: 'created 5 minutes ago' }
      ]
    };
  }

  changeTaskContent = (id, newState) => {
    this.setState(({tasks}) => {
        const taskDataLeft = tasks.map((item) => {
            if (item.id === id) {
                return newState(item)
            }
            return item
        })
        return {tasks: taskDataLeft}
    })
}
onEditTask = (id, text) => {
    this.changeTaskContent((id), (item) => {
        const taskDescription = text
        const taskStatus = 'active'
        return {...item, state: taskStatus, description: taskDescription}
    })
}
onUpdateStatusTask= (id) => {
    this.changeTaskContent(id, (item) => {
        const taskStatus = 'editing'
        return {...item, state: taskStatus}
    })
}

onToggleTaskStatus = (id) => {
  this.changeTaskContent(id, (item) => {
    const taskStatus = item.state === 'completed' ? 'active' : 'completed';
    return { ...item, state: taskStatus };
  });
}


onDeleteTask = (id) => {
    this.setState(({tasks}) => {
        const taskItemsLeft = tasks.filter((item) => item.id !== id);
        return {tasks: taskItemsLeft};
    })
}

  render() {
    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList
            taskData={this.state.tasks}
            onToggle={this.onToggleTaskStatus}
            onDelete={this.onDeleteTask}
            onUpdateStatusTask={this.onUpdateStatusTask}
            onEditTask={this.onEditTask}
          />
          <Footer />
        </section>
      </section>
    );
  }
}



