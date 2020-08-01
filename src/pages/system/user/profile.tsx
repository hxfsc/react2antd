import * as React from "react"
import { Form, Input, Row, Col } from "antd"
import { layout, formItemLayout } from "./layoutStyle"

const Textarea = Input.TextArea

const Profile: React.FC = () => {
  return (
    <Row>
      <Col {...layout}>
        <Form {...formItemLayout}>
          <Form.Item name="userName" label="姓名">
            <Input />
          </Form.Item>

          <Form.Item name="userName" label="用户名">
            <Input />
          </Form.Item>

          <Form.Item name="userName" label="密码">
            <Input />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Profile
