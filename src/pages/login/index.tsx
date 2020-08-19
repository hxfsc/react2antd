import * as React from "react"
import { Layout, Form, Input, Button, Checkbox } from "antd"
import { RouteComponentProps } from "react-router-dom"
import { UserOutlined, LockOutlined } from "@ant-design/icons"


import styles from "./styles.scss"

interface IProps extends RouteComponentProps { }


const Login: React.FC<IProps> = (props) => {

  const onFinish = () => {
    const { history:{push} } = props
    push("/")
  }

  return (
    <Layout className={styles["login"]}>
      <div className={styles["login-box"]}>
        <header className={styles["header"]}>系统登录</header>
        <Layout.Content>
          <Form initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "用户名必填!" }]}
            >
              <Input prefix={<UserOutlined />} size={"large"} placeholder="输入用户名" autoComplete={"new-user"} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "密码必填!" }]}
            >
              <Input prefix={<LockOutlined />} type="password" size={"large"} placeholder="输入密码" autoComplete={"new-password"}/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType={"submit"} size={"large"} block>登录</Button>
            </Form.Item>
          </Form>
        </Layout.Content>
      </div>
    </Layout>
  )
}
export default Login
