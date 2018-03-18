import React, { PureComponent, Component } from 'react'
import styled from 'react-emotion'

const generateId = () => (
  Math.floor((Math.random() * 1000))
)

export default class TodoContainer extends Component {
  state = {
    todos:[
      { id: generateId(), description: 'Do Something', completed: true },
      { id: generateId(), description: 'Do Something', completed: false }
    ]
  }

  handleChange = (todo) => {
    const todos = this.state.todos.reduce((acc, oldTodo) => {
      if (todo.id === oldTodo.id) {
        oldTodo.completed = !todo.completed
      }

      acc.push(oldTodo)
      return acc
    }, [])

    this.setState({ todos })
  }

  handleSubmit = (newTodo) => {
    const todos = [{ description: newTodo, completed: false, id: generateId() }].concat(this.state.todos)

    this.setState({ todos })
  }

  render () {
    return (
      <Root>
        <TodoHeader>Todos</TodoHeader>
        <TodoContent>
          <TodoInput onSubmit={this.handleSubmit} />
          <TodoList>
            {
              this.state.todos.map((todo) => (
                <EnhancedTodoItem
                  onChange={this.handleChange}
                  key={todo.id}
                  todo={todo}
                />
              ))
            }
          </TodoList>
        </TodoContent>
      </Root>
    )
  }
};


class TodoInput extends PureComponent {
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

function TodoItem ({ todo, onChange, className }) {
  return (
    <li className={className}>
      <input
        id={todo.id}
        type="checkbox" checked={todo.completed}
        onChange={() => onChange(todo)}
      />
      <TodoLabel htmlFor={todo.id}>
        {todo.description}
      </TodoLabel>
    </li>
  )
}

const TodoLabel = styled.label`
  cursor: pointer;
  flex: 1 1 auto;
  padding: 20px 5px;
`

const Root = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;

  :before {
    content: '';
    display: block;
    z-index: -1;
    overflow: hidden;
    box-shadow:
      0 -34px 0px 24px #c3c3c3,
      0 -25px 0 21px white,
      0 -24px 0px 21px #c3c3c3,
      0 -11px 0 13px white,
      0 -10px 0px 13px #c3c3c3,
      0 -1px 0 8px white,
      0 0px 0px 8px #c3c3c3;
    position: absolute;
    bottom: -10px;
    right: 25px;
    width: 450px;
  }
`

const TodoContent = styled.div`
  width: 500px;
  position: relative;
`

const TodoHeader = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 3em;
  text-transform: lowercase;
  color: rgba(175, 47, 47, 0.15);
`

const MainInput = styled.input`
  width: 100%;
  border: none;
  padding: 20px 40px;
  font-size: 1.6em;
  border-bottom: 1px solid rgba(195, 195, 195, 0.4);
`

const EnhancedTodoItem = styled(TodoItem)`
  display: flex;
  align-items: center;
  padding: 0;
  background: #FFF;
  border-bottom: 1px solid rgba(195, 195, 195, 0.4);
  font-size: 1.5em;
  color: #6d6c6c;
  font-weight: 300;
  text-decoration: ${props => props.todo.completed ? 'line-through' : 'inherit' };


`
