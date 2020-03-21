const url: Location = window.location

export const urlPathToList = (path: string): string[] => {
  if (path) {
    const arrUrl = path.split("/").filter(i => i)
    return arrUrl.map((item, index) => `/${arrUrl.slice(0, index + 1).join("/")}`)
  }
  return []
}

export const urlHostName = (): string => {
  return url.hostname || ""
}

export const urlHost = (): string => {
  return url.host || ""
}

export const urlPath = (): string => {
  return url.pathname || ""
}

