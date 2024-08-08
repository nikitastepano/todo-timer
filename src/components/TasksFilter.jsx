import React from 'react';
import PropTypes from 'prop-types';

import { Task } from './Task';

export class TasksFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 'all',
    };
  }

  render() {
    const { allTask, activeTask, complitedTask } = this.props;

    const showAll = () => {
      allTask();
      this.setState({ selected: 'all' });
    };

    const showActive = () => {
      activeTask();
      this.setState({ selected: 'active' });
    };

    const showCompleted = () => {
      complitedTask();
      this.setState({ selected: 'completed' });
    };

    return (
      <ul className="filters">
        <li>
          <button onClick={showAll} className={this.state.selected === 'all' ? 'selected' : ''}>
            All
          </button>
        </li>
        <li>
          <button onClick={showActive} className={this.state.selected === 'active' ? 'selected' : ''}>
            Active
          </button>
        </li>
        <li>
          <button onClick={showCompleted} className={this.state.selected === 'completed' ? 'selected' : ''}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  allTask: PropTypes.func,
  activeTask: PropTypes.func,
  complitedTask: PropTypes.func,
};

Task.defaultProps = {
  allTask: () => {},
  activeTask: () => {},
  complitedTask: () => {},
};
