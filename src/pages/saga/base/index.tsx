import * as React from "react"
import { connect } from "react-redux"
import { Button, Divider, Space } from "antd"
import { watchIncrementAsync, incrementAsync } from "../../../saga/base"

const SagaBase = (props) => {
    const { saga = 1, incrementAsync, watchIncrementAsync } = props
    return (
        <>
            <h1>{saga}</h1>
            <Divider />
            <Space>
                <Button onClick={() => incrementAsync()} type={"primary"}>Increment after 1 second</Button>
                <Button onClick={() => watchIncrementAsync()}>Increment</Button>
                <Button onClick={() => watchIncrementAsync()} type={"primary"} danger>Decrement</Button>
            </Space>
        </>
    )
}

export default connect(({ saga }) => ({ saga }), { watchIncrementAsync, incrementAsync })(SagaBase)
