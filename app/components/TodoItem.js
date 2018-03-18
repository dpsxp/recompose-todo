import React from 'react'
import styled from 'react-emotion'

export default function TodoItem ({ todo, onChange, onRemove, className }) {
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
      <RemoveButton onClick={() => onRemove(todo)}>
        X
      </RemoveButton>
    </li>
  )
}


const RemoveButton = styled.button`
  font-size: 1.5em;
  color: red;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
`

const TodoLabel = styled.label`
  cursor: pointer;
  flex: 1 1 auto;
  padding: 20px 5px;
`
