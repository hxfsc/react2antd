interface IRouter {
  /**
   * @param {string} name 路由名称
   */
  name: string

  /**
   * @param {string} icon 路由图标
   */
  icon?: string

  /**
   * @param {boolean} parent 父级
   */
  parent?: boolean
  /**
   * @param {string} path 路由路径
   */
  path: string

  /**
   * @param {React.Component} component 路由对应组件
  */
  component?: any

  /**
   * @param {IRouter} children 子路由
   */
  children?: IRouter[]
}

export { IRouter }
