import qs from "qs"
import * as React from "react"

const { useEffect, useState } = React
import { Table, Tag } from "antd"

import { service, IResponse } from "@/net/service"

import styles from "./index.scss"

interface IData {
  key: number
  mockTitle: string
  mockContent: string
  action: string
}

const Table1 = () => {

  const [data, setData] = useState([])

  useEffect((): void => {
    getData()

    return
  }, [])

  const getData = async () => {
    const response: IResponse<IData[]> = await service("http://localhost:9001/table", { method: "post", data: qs.stringify({ tt: 11 }) })
    const { code } = response
    if (code === 200) {
      const { data = [] } = response
      setData(data)
    }
  }

  const columns = [
    {
      title: "文字",
      key: "mockTitle",
      dataIndex: "mockTitle",
      render: (text, record) => text
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      render: (text, record) => <Tag color="geekblue">{text}</Tag>
    }
  ]
  return (
    <div className={styles["table"]}>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default Table1
