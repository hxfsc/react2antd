import * as React from "react"
import { useEventCallback } from "rxjs-hooks"
import { mapTo } from "rxjs/operators"

import { Button, Divider } from "antd"
import { Observable } from "rxjs"

const EventCallBack = () => {
    const [eventCallback, value] = useEventCallback((event$: Observable<React.SyntheticEvent>) => event$.pipe(mapTo(1000)), 300)
    return (
        <React.Fragment>
            <h1>{value}</h1>
            <Divider />
            <Button type={"primary"} onClick={eventCallback}>mapTo 1000</Button>
        </React.Fragment>
    )
}

export default EventCallBack
