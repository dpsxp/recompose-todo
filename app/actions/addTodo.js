import Rx from 'rxjs'
import { createEventHandler } from 'recompose'

export const { handler: addTodo, stream: addTodoStream$ } = createEventHandler()

// TODO: Do some kind of loading thing here maybe
export default addTodoStream$.switchMap((description) => {
  const data = {
    type: 'ADD_INIT',
    todo: {
      description,
      completed: false
    }
  }

  return Rx.Observable.merge(
    Rx.Observable.of(data),
    saveTodoSomewhereAsync(data)
  )
})

function generateId () {
  return Math.floor(Math.random() * 1000)
}

function saveTodoSomewhereAsync (data) {
  const asyncTodo = Object.assign({}, data, {
    type: 'ADD',
    todo: Object.assign({}, data.todo, { id: generateId() })
  })

  return Rx.Observable.of(asyncTodo).delay(500)
}
