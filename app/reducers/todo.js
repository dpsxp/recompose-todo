export const initialState = {
  data: [],
  todos: [],
  active: [],
  filter: 'ALL'
}

export default function reducer (state, action) {
  switch (action.type) {
    case 'FILTER': {
      const { filter } = action

      const todos = applyFilter(filter, state.data)

      return Object.assign(state, { todos, filter })
    }
    case 'ADD': {
      const data = state.data.concat([action.todo])

      return Object.assign(state, {
        data,
        todos: applyFilter(state.filter, data),
        active: data.filter(({ completed }) => !completed)
      })
    }
    case 'REMOVE': {
      const data = state.data.filter((todo) => todo.id !== action.todo.id)

      return Object.assign(state, {
        data,
        todos: applyFilter(state.filter, data),
        active: data.filter(({ completed }) => !completed)
      })
    }
    case 'CHANGE': {
      const data = state.data.map((todo) => {
        if (todo.id === action.todo.id) {
          return action.todo
        }

        return todo
      })

      return Object.assign(state, {
        data,
        todos: applyFilter(state.filter, data),
        active: data.filter(({ completed }) => !completed)
      })
    }
    default:
      return state
  }
}

function applyFilter (filter, todos) {
  switch (filter) {
    case 'ALL':
      return todos
    case 'COMPLETED':
      return todos.filter(({ completed }) => completed)
    case 'ACTIVE':
      return todos.filter(({ completed }) => !completed)
  }
}
