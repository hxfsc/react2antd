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
   * @param {string} path 路由路径
   */
  path: string

  /**
   * @param {IRouter} children 子路由
   */
  children?: IRouter[]
}

export { IRouter }
