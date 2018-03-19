import React, { PureComponent, Component } from 'react'
import { componentFromStream } from 'recompose'
import {
  selector,
  removeAction,
  changeAction,
  filterAction
} from '../streams/todo'
import store from '../store'
import TodoItem from '../components/TodoItem'
import TodoInput from '../components/TodoInput'
import TodoFooter from '../components/TodoFooter'
import { Root, TodoContent, TodoList, TodoHeader } from './styles'
import { addTodo } from '../actions/addTodo'

function TodoContainer ({
  todos,
  filter,
  active,
  onAdd,
  onChange,
  onRemove,
  onFilterChange
}) {
  return (
    <Root>
      <TodoHeader>Todos</TodoHeader>
      <TodoContent>
        <TodoInput onSubmit={onAdd} />
        <TodoList>
          {
            todos.map((todo) => (
              <TodoItem
                onRemove={onRemove}
                onChange={onChange}
                key={todo.id}
                todo={todo}
              />
            ))
          }
        </TodoList>
        <TodoFooter
          active={active}
          filter={filter}
          onChange={onFilterChange}
        />
      </TodoContent>
    </Root>
  )
}

export default componentFromStream((props$) => {
  const todos$ = store.pluck('todos')

  return props$
    .combineLatest(todos$, (props, { todos, active, filter }) => (
      <TodoContainer
        todos={todos}
        active={active}
        filter={filter}
        onAdd={addTodo}
        onRemove={removeAction}
        onChange={changeAction}
        onFilterChange={filterAction}
      />
    ))
})
