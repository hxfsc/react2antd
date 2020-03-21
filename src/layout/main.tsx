import * as React from "react"
import { Route, Switch, Redirect, Link } from "react-router-dom"
import { Layout, Menu, Breadcrumb } from "antd"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  MailOutlined
} from "@ant-design/icons"



const { Header, Sider, Content, Footer } = Layout

import { router, flatToMenu, routerMatchMenu, routerMatchBreadcrumb, IRouter } from "@/routers/index"
import { urlPath, urlPathToList } from "@/utils/urlPathParams"

import * as styles from "./styles.scss"

import { ClickParam } from "antd/lib/menu"


class MainLayout extends React.Component {

  private routerList: React.ReactNode[] = []

  state = {
    collapsed: false,
    selectedKeys: [],
    openKeys: []
  }

  componentDidMount() {
    const url = urlPath()
    const urlList = urlPathToList(url)
    const flatMenu = flatToMenu(router)

    this.setState({
      selectedKeys: routerMatchMenu(flatMenu, urlList),
      openKeys: urlList
    })
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
          <Menu.SubMenu key={item.path} title={<span><MailOutlined />{item.name ?? "导航"}</span>}>
            {this.renderMenu(item.children)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path} className={styles["menu"]}>
            <UserOutlined />
            <span>{item.name ?? "导航"}</span>
          </Link>
        </Menu.Item >
      )
    })

    return menu
  }


  renderRouter = (router: IRouter[]): React.ReactNode => {
    router.forEach((item: IRouter) => {
      if (item.children) {
        this.renderRouter(item.children)
      }
      if (item.component) {
        this.routerList.push(<Route path={item.path} component={item.component} key={item.path} />)
      }
    })
    return this.routerList
  }

  renderBreadcrumb = (): React.ReactNode => {
    const url = urlPath()
    const urlList = urlPathToList(url)

    const breadcrumbs: IRouter[] = routerMatchBreadcrumb(router, urlList)

    return breadcrumbs.map((item: IRouter, index: number) => <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>)
  }

  handleOpenChangeMenu = (openKeys: string[]): void => {
    this.setState({ openKeys })
  }

  handleClickMenu = (parma: ClickParam): void => {
    const { keyPath: openKeys, key: selectedKeys } = parma
    this.setState({ selectedKeys, openKeys })
  }

  render() {
    const { selectedKeys, openKeys } = this.state
    return (
      <Layout className={styles["dashboard"]}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles["logo"]} />
          <Menu
            theme="dark"
            mode="inline"
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onClick={this.handleClickMenu}
            onOpenChange={this.handleOpenChangeMenu}>
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
            {this.renderBreadcrumb()}
          </Breadcrumb>

          <Content
            className={`${styles["site-layout-background"]} ${styles["site-layout-main"]}`}>
            <Switch>
              {this.renderRouter(router)}
              <Redirect path={"/"} exact to={{ pathname: "/dashboard/analysis/realtime" }} />
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
