import * as React from "react"
import { Route, Switch, Redirect, Link } from "react-router-dom"
import loadable from "@loadable/component"

import { Layout, Menu } from "antd"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'

const { Header, Sider, Content, Footer } = Layout


const Dashboard = loadable(() => import("../pages/dashboard"))
const Charts = loadable(() => import("../pages/charts"))

import * as styles from "./styles.scss"

class MainLayout extends React.Component {

  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout className={styles["dashboard"]}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles["logo"]} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to={"/dashboard"}>
                <UserOutlined />
                <span>nav 1</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={"/charts"}>
                <VideoCameraOutlined />
                <span>nav 2</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className={styles["site-layout-background"]} style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles["trigger"],
              onClick: this.toggle,
            })}
          </Header>
          <Content className={`${styles["site-layout-background"]} ${styles["site-layout-main"]}`}>
            <Switch>
              <Route path={"/dashboard"} exact component={Dashboard} />
              <Route path={"/charts"} exact component={Charts} />
              <Route path={"/"} exact component={Dashboard} />
              <Redirect to={{ pathname: "/404" }} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout
