import { IRouter } from "./interface"
import { router as oldRouter } from "./router"
import { pathToRegexp } from "path-to-regexp"

const formatRouter = (router: IRouter[], parentPath = ""): IRouter[] => {
  const newRouter = router.map((item: IRouter) => {
    const path = `${parentPath}/${item.path}`
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

const flatToMenu = (menu: IRouter[] = []): IRouter[] => {
  if (Array.isArray(menu)) {
    return menu.reduce((prev: IRouter[], next: IRouter): IRouter[] => {
      prev.push(next)
      if (next.children) {
        return [...prev, ...flatToMenu(next.children)]
      }
      return prev
    }, [])
  }
  return []
}

const routerMatchMenu = (flatMenu: IRouter[] = [], urlPaths: string[] = []): string[] => {
  if (Array.isArray(urlPaths) && Array.isArray(flatMenu)) {
    return urlPaths.reduce((prev: string[], next: string): string[] => {
      return [...prev, ...flatMenu.filter(menu => pathToRegexp(menu.path).test(next)).map(item => item.path)]
    }, [])
  }
  return []
}


const flatRouters = (routers: IRouter[]): IRouter[] => {
  return routers.reduce((prev: IRouter[], next: IRouter): IRouter[] => {
    prev.push(next)
    if (next.children) {
      return [...prev, ...flatRouters(next.children)]
    }
    return prev
  }, [])
}

const routerMatchBreadcrumb = (routers: IRouter[], urlPaths: string[]): IRouter[] => {
  const flatRouters = flatToMenu(routers)
  return urlPaths.map((item:string):IRouter=>{
    return flatRouters.find(router=> pathToRegexp(item).test(router.path))
  })
}

const router = formatRouter(oldRouter)

export { router, flatToMenu, routerMatchMenu, routerMatchBreadcrumb, IRouter }
