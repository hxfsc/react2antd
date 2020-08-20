let BASE_URL = "http://localhost:9001/"

if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://localhost:9001/"
}


export const table = {
  /**
   * base
  */
  base: `${BASE_URL}table/base`
}

export const map = {
  area: `${BASE_URL}map/area`
}
