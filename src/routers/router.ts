import { IRouter } from "./interface"

const router: IRouter[] = [
  {
    name: "仪表盘",
    icon: "dashboard",
    path: "dashboard",
    children: [
      {
        name: "分析页",
        path: "analysis",
        children: [
          {
            name: "实时数据",
            path: "realtime"
          },
          {
            name: "离线数据",
            path: "offline"
          }
        ]
      },
    ]
  },
  {
    name: "表格",
    icon: "dashboard",
    path: "table",
    children: [
      {
        name: "基本",
        path: "base",
        children: [
          {
            name: "表格一",
            path: "table1"
          },
          {
            name: "表格二",
            path: "table2"
          }
        ]
      },
    ]
  },
  {
    name: "仪表盘",
    icon: "dashboard",
    path: "dashboard",
    children: [
      {
        name: "分析页",
        path: "analysis",
        children: [
          {
            name: "实时数据",
            path: "realtime"
          },
          {
            name: "离线数据",
            path: "offline"
          }
        ]
      },
    ]
  }
]

export { router }
