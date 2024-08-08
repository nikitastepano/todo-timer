import React from 'react';
import PropTypes from 'prop-types';

import { Task } from './Task';

export class TaskList extends React.Component {
  render() {
    const { todoData, setComplitedTask, deleteItem } = this.props;

    return (
      <ul className="todo-list">
        {todoData.map((item) => {
          const { id } = item;
          return <Task todo={item} key={id} setComplitedTask={setComplitedTask} deleteItem={deleteItem} />;
        })}
      </ul>
    );
  }
}

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      hidden: PropTypes.bool.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  setComplitedTask: PropTypes.func,
  deleteItem: PropTypes.func,
};

TaskList.defaultProps = {
  todoData: [],
  setComplitedTask: () => {},
  deleteItem: () => {},
};
