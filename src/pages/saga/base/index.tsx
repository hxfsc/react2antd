import * as React from "react"
import { Button, Divider, Space } from "antd"

const SagaBase = (props) => {
    const { value = 1, onIncrementAsync, onIncrement, onDecrement } = props
    return (
        <>
            <h1>{value}</h1>
            <Divider />
            <Space>
                <Button onClick={onIncrementAsync} type={"primary"}>Increment after 1 second</Button>
                <Button onClick={onIncrement}>Increment</Button>
                <Button onClick={onDecrement} type={"primary"} danger>Decrement</Button>
            </Space>
        </>
    )
}

export default SagaBase