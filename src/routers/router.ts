import Loadable from "react-loadable"
import { IRouter } from "./interface"


import Loading from "@/pages/loading"

const Realtime = Loadable({
  loader: () => import("@/pages/dashboard/analysis/realtime"),
  loading: Loading
})

const Offline = Loadable({
  loader: () => import("@/pages/dashboard/analysis/offline"),
  loading: Loading
})


const Table1 = Loadable({
  loader: () => import("@/pages/table/base/table1"),
  loading: Loading
})

const Table2 = Loadable({
  loader: () => import("@/pages/table/base/table2"),
  loading: Loading
})


const router: IRouter[] = [
  {
    name: "仪表盘",
    path: "dashboard",
    parent: true,
    children: [
      {
        name: "分析页",
        path: "analysis",
        children: [
          {
            name: "实时数据",
            path: "realtime",
            component: Realtime
          },
          {
            name: "离线数据",
            path: "offline",
            component: Offline
          }
        ]
      },
    ]
  },
  {
    name: "表格",
    icon: "dashboard",
    path: "table",
    parent: true,
    children: [
      {
        name: "基本",
        path: "base",
        children: [
          {
            name: "表格一",
            path: "table1",
            component: Table1
          },
          {
            name: "表格二",
            path: "table2",
            component: Table2
          }
        ]
      },
      {
        name: "高级",
        path: "base2",
        component: Table2
      }
    ]
  },
  {
    name: "图表",
    icon: "dashboard",
    path: "charts",
    parent: true,
    component: Table2
  }
]

export { router }
