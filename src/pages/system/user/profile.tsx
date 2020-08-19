import * as React from "react"
import { Form, Input, Row, Col, Button, Space } from "antd"
import { layout, formItemLayout } from "./layoutStyle"

const Profile: React.FC = () => {
  const { useState } = React
  const [form] = Form.useForm()

  const [username, setUserName] = useState<string>()
  const [passwd, setPasswd] = useState<string>()

  const submit = () => {
    form.validateFields().then((values) => {
      console.log(values)
    })
  }

  const reset = () => {
    form.resetFields()
  }

  return (
    <section>
      <Row>
        <Col {...layout}>
          <Form {...formItemLayout} form={form}>
            <Form.Item name="username" label="姓名" rules={[{ required: true, message: "请输入姓名" }]}>
              <Input value={username} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value ?? "")} />
            </Form.Item>

            <Form.Item name="passwd" label="密码" rules={[{ required: true, message: "请输入密码" }]}>
              <Input value={passwd} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswd(event.target.value ?? "")} />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col {...layout}>
          <Form {...formItemLayout}>
            <Form.Item label=" " colon={false}>
              <Space size={"small"}>
                <Button type={"primary"} onClick={submit}>
                  确定
                </Button>
                <Button type={"default"} onClick={reset}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </section>
  )
}

export default Profile
