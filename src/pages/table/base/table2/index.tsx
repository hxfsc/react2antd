import * as React from "react"
import { Descriptions } from "antd"
const Table2 = () => {
  return (
    <div>
      <Descriptions title="User Info">
        <Descriptions.Item key={1} label="UserName">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item key={2} label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item key={3} label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item key={4} label="Remark">empty</Descriptions.Item>
        <Descriptions.Item key={5} label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default Table2
