import { IRouter } from "./interface"
import { router as oldRouter } from "./router"



const formatRouter = (router: IRouter[], parsetPath = "/"): IRouter[] => {
  const newRouter = router.map((item: IRouter) => {

    const path = `${parsetPath}${item.path}/`

    let result: IRouter = {
      ...item,
      path
    }

    if (item.children && item.children.length > 0) {
      result.children = formatRouter(item.children, path)
    }
    return result
  })

  return newRouter
}


const router = formatRouter(oldRouter)

export { router, IRouter }
