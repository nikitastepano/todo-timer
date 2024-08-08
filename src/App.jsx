import React from 'react';

import { NewTaskForm } from './components/NewTaskForm';
import { TaskList } from './components/TaskList';
import { Footer } from './components/Footer';
import './index.css';

let lastId = 0;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoData: [],
    };
  }

  addItem(value) {
    const data = {
      label: value,
      completed: false,
      id: ++lastId,
      hidden: false,
      date: new Date(),
    };

    this.setState(({ todoData }) => ({
      todoData: [...todoData, data],
    }));
  }

  setComplitedTask(id) {
    this.setState({
      ...this.state,
      todoData: this.state.todoData.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  }

  deleteItem(id) {
    this.setState({ todoData: this.state.todoData.filter((element) => element.id !== id) });
  }

  clearCompleted() {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((item) => !item.completed) }));
  }

  allTask() {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        item.hidden = false;
        return item;
      }),
    }));
  }

  activeTask() {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        if (item.completed) {
          item.hidden = true;
        } else {
          item.hidden = false;
        }
        return item;
      }),
    }));
  }
  complitedTask() {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        if (item.completed) {
          item.hidden = false;
        } else {
          item.hidden = true;
        }
        return item;
      }),
    }));
  }
  render() {
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem.bind(this)} />
        <section className="main">
          <TaskList
            todoData={this.state.todoData}
            setComplitedTask={this.setComplitedTask.bind(this)}
            deleteItem={this.deleteItem.bind(this)}
          />
          <Footer
            todoData={this.state.todoData}
            clearCompleted={this.clearCompleted.bind(this)}
            allTask={this.allTask.bind(this)}
            activeTask={this.activeTask.bind(this)}
            complitedTask={this.complitedTask.bind(this)}
          />
        </section>
      </section>
    );
  }
}
