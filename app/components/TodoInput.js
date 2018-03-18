import React, { PureComponent } from 'react'
import styled from 'react-emotion'

export default class TodoInput extends PureComponent {
  state = { newTodo: '' }

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.newTodo)
    this.setState({ newTodo: '' })
  }

  render () {
    const { newTodo } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <MainInput
          placeholder='What needs to be done?'
          name="new_todo"
          type="text"
          value={newTodo}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

const MainInput = styled.input`
  width: 100%;
  border: none;
  padding: 20px 40px;
  font-size: 1.6em;
  border-bottom: 1px solid rgba(195, 195, 195, 0.4);
`
