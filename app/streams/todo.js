import Rx from 'rxjs'
import { createEventHandler } from 'recompose'

const generateId = () => Math.floor(Math.random() * 1000)

export const { handler: add, stream: add$ } = createEventHandler()
export const { handler: remove, stream: remove$ } = createEventHandler()
export const { handler: change, stream: change$ } = createEventHandler()

export default function todoStream () {
  return Rx.Observable.merge(
    add$.map((description) => {
      return {
        type: 'ADD',
        todo: { description, id: generateId(), completed: false }
      }
    }),
    change$.map((todo) => {
      return {
        type: 'CHANGE',
        todo: Object.assign(todo, { completed: !todo.completed })
      }
    }),
    remove$.map((todo) => {
      return {
        type: 'REMOVE',
        todo
      }
    })
  )
  .startWith([])
  .scan(reducer)
}

function reducer (state, action) {
  if (action.type === 'ADD') {
    return state.concat([action.todo])
  }

  if (action.type === 'REMOVE') {
    return state.filter((todo) => todo.id !== action.todo.id)
  }

  if (action.type === 'COMPLETE') {
    return state.map((todo) => {
      if (todo.id === action.todo.id) {
        return action.todo
      }

      return todo
    })
  }

  return state
}
