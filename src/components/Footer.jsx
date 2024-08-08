import React from 'react';
import PropTypes from 'prop-types';

import { TasksFilter } from './TasksFilter';

export class Footer extends React.Component {
  render() {
    const { todoData, clearCompleted, allTask, activeTask, complitedTask } = this.props;

    const itemLeft = todoData.filter((item) => !item.completed).length;

    return (
      <footer className="footer">
        <span className="todo-count">{itemLeft} items left</span>
        <TasksFilter allTask={allTask} activeTask={activeTask} complitedTask={complitedTask} />
        <button onClick={clearCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      hidden: PropTypes.bool.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  clearCompleted: PropTypes.func,
  allTask: PropTypes.func,
  activeTask: PropTypes.func,
  complitedTask: PropTypes.func,
};

Footer.defaultProps = {
  todoData: [],
  clearCompleted: () => {},
  allTask: () => {},
  activeTask: () => {},
  complitedTask: () => {},
};
