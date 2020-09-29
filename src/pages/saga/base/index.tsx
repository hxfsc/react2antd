import * as React from "react"
import { connect } from "react-redux"
import { Button, Divider, Space } from "antd"
import { increment, deIncrement } from "@/reducers/saga"

const SagaBase = (props) => {
    const { saga = 1, increment, deIncrement } = props
    return (
        <>
            <h1>{saga}</h1>
            <Divider />
            <Space>
                <Button onClick={() => increment()} type={"primary"}>Increment after 1 second</Button>
                <Button onClick={() => deIncrement(12)}>Increment</Button>
                <Button onClick={() => deIncrement(111)} type={"primary"} danger>Decrement</Button>
            </Space>
        </>
    )
}

export default connect(({ saga }) => ({ saga }), { increment, deIncrement })(SagaBase)
