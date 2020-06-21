import * as React from "react"
import { useEventCallback } from "rxjs-hooks"
import { withLatestFrom, map } from "rxjs/operators"

import { Button, Divider, Row, Col } from "antd"
import { Observable } from "rxjs"

const EventState = () => {
  const [clickCallback, [x, y, description, prevDescription]] = useEventCallback(
    (event$: any, state$) =>
      event$.pipe(
        withLatestFrom(state$),
        map(([event, state]) => [event.clientX, event.clientY, event.target.innerHTML, state[state.length - 1]])
      ),
    [0, 0, "nothing", "nothing"]
  )

  return (
    <React.Fragment>
      <h1></h1>
      <Divider />
      <div>
        <span>{x}</span>, <span>{y}</span>
      </div>
      <div>{description}</div>
      <div>{prevDescription}</div>

      <Divider />

      <Row>
        <Col>
          <button onClick={clickCallback}>+</button>
        </Col>
        <Col>
          <button onClick={clickCallback}>-</button>
        </Col>
        <Col>
          <button onClick={clickCallback}>=</button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default EventState
