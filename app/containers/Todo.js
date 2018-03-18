import React, { PureComponent, Component } from 'react'
import styled from 'react-emotion'
import { componentFromStream } from 'recompose'
import { selector, add, remove, change } from '../streams/todo'
import store from '../store'
import TodoItem from '../components/TodoItem'
import TodoInput from '../components/TodoInput'

function TodoContainer ({ todos, onAdd, onChange, onRemove }) {
  return (
    <Root>
      <TodoHeader>Todos</TodoHeader>
      <TodoContent>
        <TodoInput onSubmit={onAdd} />
        <TodoList>
          {
            todos.map((todo) => (
              <EnhancedTodoItem
                onRemove={onRemove}
                onChange={onChange}
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

export default componentFromStream((props$) => {
  const todos$ = store.pluck('todos')

  return props$
    .combineLatest(todos$, (props, todos) => (
      <TodoContainer
        todos={todos}
        onAdd={add}
        onRemove={remove}
        onChange={change}
      />
    ))
})

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
