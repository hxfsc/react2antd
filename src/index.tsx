import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

import App from "./App"

const render = (App) => {
  ReactDOM.render(<AppContainer><App /></AppContainer>, document.getElementById("root"))
}

render(App)

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    const HotApp = require("./App").default
    render(HotApp)
  })
}

