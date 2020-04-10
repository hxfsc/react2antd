import * as React from "react"
import { Button, Space, Divider } from "antd"
import { connect, ConnectedProps } from "react-redux"

import { addAction, subtractAction } from "@/reducers/num"
import { reduxStateType } from "@/reducers/index"

const mapState = ({ num }: reduxStateType) => ({ num })
const mapActions = { addAction, subtractAction }

const connector = connect(mapState, mapActions)
type IProps = ConnectedProps<typeof connector>

@connector
class Offline extends React.Component<IProps> {
  render() {
    const { addAction, subtractAction, num: { count } } = this.props
    return (
      <div>
        <div>{count}</div>
        <Divider />
        <div>
          <Space size={"middle"}>
            <Button type={"primary"} size={"small"} onClick={() => addAction(count)}>+</Button>
            <Button type={"danger"} size={"small"} onClick={() => subtractAction(count)}>-</Button>
          </Space>
        </div>
      </div>
    )
  }
}

export default Offline
