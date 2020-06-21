import * as React from "react"
import { Route, Switch, Redirect, Link, RouteComponentProps } from "react-router-dom"
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from "antd"
import { AreaChartOutlined, TableOutlined, BlockOutlined, DashboardOutlined, UngroupOutlined, RocketOutlined, MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, KeyOutlined, UserOutlined } from "@ant-design/icons"

import dayjs from "dayjs"

interface IIcons {
  icon: string
  component: React.ReactElement
}

const icons: IIcons[] = [
  { icon: "AreaChartOutlined", component: <AreaChartOutlined /> },
  { icon: "BlockOutlined", component: <BlockOutlined /> },
  { icon: "DashboardOutlined", component: <DashboardOutlined /> },
  { icon: "UngroupOutlined", component: <UngroupOutlined /> },
  { icon: "TableOutlined", component: <TableOutlined /> }
]

const { Header, Sider, Content, Footer } = Layout

import { router, flatToMenu, routerMatchMenu, routerMatchBreadcrumb, IRouter } from "@/routers/index"
import { urlPath, urlPathToList } from "@/utils/urlPathParams"

import * as styles from "./styles.scss"

import { ClickParam } from "antd/lib/menu"

import { stylePadding0, styleFooter, styleMain } from "./styles"

interface IProps extends RouteComponentProps { }

interface IState { }


const copyRightDate = dayjs().add(1, "year").format("YYYY")
class MainLayout extends React.Component<IProps, IState> {

  private routerList: React.ReactElement[] = []

  state = {
    collapsed: true,
    selectedKeys: [],
    openKeys: []
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { selectedKeys } = this.openSelectKey()
    this.setState({
      selectedKeys
    })
  }

  openSelectKey = () => {
    const url = urlPath()
    const urlList = urlPathToList(url)
    const flatMenu = flatToMenu(router)
    const selectedKeys = routerMatchMenu(flatMenu, urlList)
    return { openKeys: urlList, selectedKeys }
  }

  toggleCollapsed = () => {
    const { collapsed } = this.state
    const { openKeys, selectedKeys } = this.openSelectKey()
    if (collapsed) {
      this.setState({ collapsed: false, openKeys, selectedKeys })
    } else {
      this.setState({ collapsed: true, openKeys: [], selectedKeys })
    }
  }

  renderIcon = (item: IRouter): React.ReactElement => {

    if (!item.icon) {
      return <RocketOutlined />
    }
    return icons.find((list: IIcons) => list.icon === item.icon)?.component || <RocketOutlined />
  }

  renderMenu = (router: IRouter[]): React.ReactNode => {
    const menu = router.map((item: IRouter): React.ReactNode => {
      if (item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu key={item.path} title={<span>{this.renderIcon(item)}<span>{item.name ?? "导航"}</span> </span>}>
            {this.renderMenu(item.children)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path} className={styles["menu"]}>
            {item.parent && this.renderIcon(item)}
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

  handleClickBreadcrumbClick = (parma: ClickParam): void => {
    const { key: selectedKeys } = parma
    const { collapsed } = this.state
    const openKeys = urlPathToList(selectedKeys)
    this.setState({ selectedKeys, openKeys })
    //切换breadcrumb menu会自动弹出, 解决弹出问题
    if (collapsed) {
      this.setState({ openKeys: [] })
    }
  }

  renderOverLay = (children: IRouter[]): React.ReactElement => {
    if (children && Array.isArray(children)) {
      return (
        <Menu onClick={this.handleClickBreadcrumbClick}>
          {children.map((item: IRouter): React.ReactNode => {
            let menuItemPath = ""
            if (item.children) {
              menuItemPath = item.children[0].path
            } else {
              menuItemPath = item.path
            }
            return <Menu.Item key={menuItemPath}><Link to={menuItemPath}>{item.name}</Link></Menu.Item>
          })}
        </Menu>
      )
    }
    return
  }

  renderBreadcrumb = (): React.ReactNode => {
    const url = urlPath()
    const urlList = urlPathToList(url)

    const breadcrumbs: IRouter[] = routerMatchBreadcrumb(router, urlList)

    return breadcrumbs.map((item: IRouter, index: number) => <Breadcrumb.Item key={index} overlay={this.renderOverLay(item.children)}>{item.name}</Breadcrumb.Item>)
  }

  handleOpenChangeMenu = (openKeys: string[]): void => {
    const { collapsed } = this.state
    this.setState({ openKeys })
  }

  handleClickMenu = (parma: ClickParam): void => {
    const { keyPath: openKeys, key: selectedKeys } = parma
    this.setState({ selectedKeys, openKeys })
  }

  renderDropDownItem = () => {

    const logout = () => {
      const { history: { push } } = this.props
      push("/login")
    }

    return (
      <Menu>
        <Menu.Item key="1"><UserOutlined />个人中心</Menu.Item>
        <Menu.Item key="2"><KeyOutlined />修改密码</Menu.Item>
        <Menu.Item key="3" onClick={logout}><LogoutOutlined />退出</Menu.Item>
      </Menu>
    )
  }

  render() {
    const { selectedKeys, openKeys, collapsed } = this.state
    return (
      <Layout className={styles["dashboard"]}>
        <Sider className={styles["sider"]} trigger={null} collapsible collapsed={collapsed} collapsedWidth={80}>
          <div className={styles["logo"]} />
          <Menu
            mode={"inline"}
            theme={"dark"}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onClick={this.handleClickMenu}
            onOpenChange={this.handleOpenChangeMenu}>
            {this.renderMenu(router)}
          </Menu>
        </Sider>

        <Layout className={styles["site-layout"]} style={{ marginLeft: collapsed ? "80px" : "200px" }}>
          <Header className={styles["header"]} style={stylePadding0}>
            <div>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, { className: styles["trigger"], onClick: this.toggleCollapsed })}
            </div>
            <div className={styles["user"]}>
              <Dropdown overlay={this.renderDropDownItem} placement={"bottomLeft"}>
                <Avatar size={"large"} className={styles["avatar"]}>H</Avatar>
              </Dropdown>
            </div>
          </Header>
          <Breadcrumb className={styles["breadcrumb"]}>
            {this.renderBreadcrumb()}
          </Breadcrumb>
          <Content>
            <div className={styles["main"]} style={styleMain}>
              <Switch>
                {this.renderRouter(router)}
                <Redirect path={"/"} exact to={{ pathname: "/dashboard/analysis/realtime" }} />
                <Redirect to={{ pathname: "/404" }} />
              </Switch>
            </div>
          </Content>
          <Footer className={styles["footer"]} style={styleFooter}>Ant Design © {copyRightDate} </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout
