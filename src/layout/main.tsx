import * as React from "react"
import { Route, Switch, Redirect, Link } from "react-router-dom"
import { Layout, Menu, Breadcrumb } from "antd"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MailOutlined
} from "@ant-design/icons"

const { Header, Sider, Content, Footer } = Layout

import { router, IRouter } from "@/routers/index"

import Dashboard from "@/pages/dashboard"
import Charts from "@/pages/charts"

import * as styles from "./styles.scss"

class MainLayout extends React.Component {
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  renderMenu = (router: IRouter[]): React.ReactNode => {
    const menu = router.map((item: IRouter, index: number): React.ReactNode => {
      if (item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu key={`${item.path}-${index}`} title={<span><MailOutlined />{item.name ?? "导航"}</span>}>
            {this.renderMenu(item.children)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={`${item.path}-${index}`}>
          <Link to={item.path} className={styles["menu"]}>
            <UserOutlined />
            <span>{item.name ?? "导航"}</span>
          </Link>
        </Menu.Item >
      )
    })

    return menu
  }

  render() {
    return (
      <Layout className={styles["dashboard"]}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles["logo"]} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {this.renderMenu(router)}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className={styles["site-layout-background"]}
            style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: styles["trigger"],
                onClick: this.toggle
              }
            )}
          </Header>

          <Breadcrumb className={styles["breadcrumb"]}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>

          <Content
            className={`${styles["site-layout-background"]} ${styles["site-layout-main"]}`}>
            <Switch>
              <Route path={"/dashboard"} exact component={Dashboard} />
              <Route path={"/charts"} exact component={Charts} />
              <Route path={"/"} exact component={Dashboard} />
              <Redirect to={{ pathname: "/404" }} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout
