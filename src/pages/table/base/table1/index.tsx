import * as React from "react"

const { useEffect, useState } = React
import { Table, Tag } from "antd"

import axios from "@/net/axios"

import styles from "./index.scss"

const Table1 = () => {

  const [data, setData] = useState([])

  useEffect(():void => {
    getData()

    return
  }, [])

 const getData = async () => {
    const response = await axios.get("http://localhost:9001/table")
    const { code } = response
    if (code === 200) {
      const { data=[] } = response
      setData(data)
    }
  }

  const columns = [
    {
      title: "文字",
      key: "mockTitle",
      dataIndex: "mockTitle",
      render: (text, record)=> text
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
    render: (text, record)=> <Tag color="geekblue">{text}</Tag>
    }
  ]
  return (
    <div className={styles["table"]}>
      <Table columns={columns} dataSource={data}  />
    </div>
  )
}

export default Table1
