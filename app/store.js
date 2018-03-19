import todoStream from './streams/todo'
import Rx from 'rxjs'

const store = Rx.Observable.merge(
  todoStream().map((todos) => ({ todos }))
)
.startWith({})
.scan(Object.assign)

export default store
