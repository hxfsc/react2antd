import * as React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"

import MainLayout from "./layout/main"
import Login from "./pages/login"
import NoFund from "./pages/nofund"


import store from "./Store"
class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path={"/login"} exact component={Login} />
            <Route path={"/404"} exact component={NoFund} />
            <Route path={"/"} component={MainLayout} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
