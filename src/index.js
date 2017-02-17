import { Router, Route, browserHistory, IndexRoute } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import { Provider } from "react-redux"
import ReactDOM from "react-dom"
import React from "react"
import App from "./containers/App"
import Home from "./containers/Home"
import NoMatch from "./components/NoMatch"

import configure from "./store"

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
)
