import * as React from "react"
import { connect } from "react-redux"
import { Button, Space } from "antd"

import { add, minus, asyncAdd, asyncMinus } from "@/epics/conuter"


const RxObservable = (props) => {
  const { counter, onAdd, onMinus, onAsyncAdd, onAsyncMinus } = props
  return (
    <div>
      <div>{counter}</div>
      <Space>
        <Button onClick={onAdd} type={"primary"}>加</Button>
        <Button onClick={onMinus} type={"danger"}>减</Button>
        <Button onClick={onAsyncAdd()}>延迟+1</Button>
        <Button onClick={onAsyncMinus}>延迟-1</Button>
      </Space>
    </div>
  )
}

export default connect(({ counter }) => ({ counter }), { onAdd: () => add(), onMinus: () => minus(), onAsyncAdd: () => asyncAdd(), onAsyncMinus: () => asyncMinus() })(RxObservable)
