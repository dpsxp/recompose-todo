import Rx from 'rxjs'
import { createEventHandler } from 'recompose'
import reducer, { initialState } from '../reducers/todo'

const generateId = () => Math.floor(Math.random() * 1000)

export const { handler: addAction, stream: add$ } = createEventHandler()
export const { handler: removeAction, stream: remove$ } = createEventHandler()
export const { handler: changeAction, stream: change$ } = createEventHandler()
export const { handler: filterAction, stream: filter$ } = createEventHandler()

export default function todoStream () {
  return Rx.Observable.merge(
    add$.map((description) => ({
      type: 'ADD',
      todo: { description, id: generateId(), completed: false }
    })),
    change$.map((todo) => ({
      type: 'CHANGE',
      todo: Object.assign(todo, { completed: !todo.completed })
    })),
    remove$.map((todo) => ({
      type: 'REMOVE',
      todo
    })),
    filter$.map((filter) => ({
      type: 'FILTER',
      filter
    }))
  )
  .startWith(initialState)
  .scan(reducer)
}
