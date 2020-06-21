import axios, { AxiosResponse, AxiosRequestConfig } from "axios"

export interface IResponse<T = any> {
  code: number
  message: string
  data: T
}

axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded"
axios.defaults.withCredentials = false

type IParam = AxiosRequestConfig

export const service = (url: string, param: IParam = {}): Promise<IResponse> => {
  return new Promise((resolve) => {
    const request: AxiosRequestConfig = {
      url,
      ...param
    }
    axios(request).then((response: AxiosResponse<IResponse>) => resolve(response.data))
  })
}
