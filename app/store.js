import todoStream from './streams/todo'
import Rx from 'rxjs'

const store = Rx.Observable.merge(
  todoStream().map((todos) => ({ todos }))
)
.startWith({})
.scan((store, change = {}) => {
  return Object.assign(store, change)
})

export default store
