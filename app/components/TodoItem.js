import React from 'react'
import styled from 'react-emotion'

function TodoItem ({ todo, onChange, onRemove, className }) {
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

export default styled(TodoItem)`
  display: flex;
  align-items: center;
  padding: 0;
  background: #FFF;
  border-bottom: 1px solid rgba(195, 195, 195, 0.4);
  font-size: 1.5em;
  color: #6d6c6c;
  font-weight: 300;

  label {
    text-decoration: ${props => props.todo.completed ? 'line-through' : 'inherit' };
  }
`

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
