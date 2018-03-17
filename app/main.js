import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

function render (Component) {
  ReactDOM.render(<Component />, document.querySelector('#app'))
}

render(App)

if (module.hot) {
  module.hot.accept('./app.js', () => {
    render(require('./app.js').default)
  })
}
