import React from 'react';
import PropTypes from 'prop-types';

export class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  render() {
    const { tittle, placeholder, addItem } = this.props;

    const submit = (event) => {
      event.preventDefault();
      if (this.state.value.trim()) addItem(this.state.value);
      this.setState({ value: '' });
    };

    return (
      <form onSubmit={submit} className="header">
        <h1>{tittle}</h1>
        <input
          id="searchPanel"
          className="new-todo"
          placeholder={placeholder}
          autoFocus
          onChange={(event) => this.setState({ value: event.target.value })}
          value={this.state.value}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  addItem: PropTypes.func,
};

NewTaskForm.defaultProps = {
  placeholder: 'What needs to be done?',
  tittle: 'Todos',
  addItem: () => {},
};
