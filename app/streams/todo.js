import Rx from 'rxjs'
import { createEventHandler } from 'recompose'
import reducer, { initialState } from '../reducers/todo'
import addTodoStream$ from '../actions/addTodo'

export const { handler: removeAction, stream: remove$ } = createEventHandler()
export const { handler: changeAction, stream: change$ } = createEventHandler()
export const { handler: filterAction, stream: filter$ } = createEventHandler()

export default function todoStream () {
  return Rx.Observable.merge(
    addTodoStream$,
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
