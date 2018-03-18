import React from 'react'
import styled from 'react-emotion'

export default function TodoFooter ({ active, filter, onChange }) {
  return (
    <Root>
      <span>{active.length} item(s) left</span>
      <ButtonsArea>
        <FilterButton onClick={() => onChange('ALL')}active={filter === 'ALL'}>All</FilterButton>
        <FilterButton onClick={() => onChange('COMPLETED')}active={filter === 'COMPLETED'}>Completed</FilterButton>
        <FilterButton onClick={() => onChange('ACTIVE')}active={filter === 'ACTIVE'}>Active</FilterButton>
      </ButtonsArea>
    </Root>
  )
}

const ButtonsArea = styled.div`
  flex: 1 1 auto;
  margin-left: 20px;
  text-align: center;
`

const FilterButton = styled.button`
  background: none;
  border: 1px solid #c3c3c3;
  margin: 5px;
  padding: 5px;
  background-color: ${props => props.active ? '#c3c3c3': 'none'}
`

const Root = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background: #fff;
  padding: 10px;

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
