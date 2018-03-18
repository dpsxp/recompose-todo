import styled from 'react-emotion'

export const Root = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

export const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
`

export const TodoContent = styled.div`
  width: 500px;
  position: relative;
`

export const TodoHeader = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 3em;
  text-transform: lowercase;
  color: rgba(175, 47, 47, 0.15);
`
