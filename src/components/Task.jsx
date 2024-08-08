import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export class Task extends React.Component {

  state = {
    timer: 0,
    isActiveTimer: true
  }

  intervalId = null;

  componentDidUpdate(prevState) {
    if (prevState.isActiveTimer !== this.state.isActiveTimer) {
        if (this.state.isActiveTimer) {
            this.startTimer();
        } else {
            this.stopTimer();
        }
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    if (!this.intervalId) {
        this.intervalId = setInterval(this.onTimerTick, 1000);
    }
  };

  stopTimer = () => {
    if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
  };

  onTimerTick = () => {
    this.setState((prevState) => ({
        timer: prevState.timer + 1
    }));
};

  pauseTimer = () => {
      this.setState({ isActiveTimer: false });
  };

  startTimerHandler = () => {
      this.setState({ isActiveTimer: true });
  };

  formatTime = (totalSeconds) => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  render() {
    const {
      todo: { label, completed, id, hidden, date },
      setComplitedTask,
      deleteItem,
    } = this.props;
    const { timer } = this.state

    return (
      <li className={`${completed ? 'completed' : ''} ${hidden ? 'hidden' : ''}`}>
        <div className="view">
          <input onChange={() => setComplitedTask(id)} id={id} className="toggle" type="checkbox" />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className='timer'>
              <button onClick={this.startTimerHandler} className='timer-start'>▶</button>
              <button onClick={this.pauseTimer} className='timer-pause'>⏸</button>
              <div className='timer-show'>{this.formatTime(timer)}</div>
            </span>
            <span className="created">created {formatDistanceToNow(date)} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button onClick={() => deleteItem(id)} className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  todo: PropTypes.shape({
    label: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }),
  setComplitedTask: PropTypes.func,
  deleteItem: PropTypes.func,
};

Task.defaultProps = {
  todo: [],
  setComplitedTask: () => {},
  deleteItem: () => {},
};
