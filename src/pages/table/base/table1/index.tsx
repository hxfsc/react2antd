import qs from "qs"
import * as React from "react"
const { useEffect, useState } = React
import { Table, Tag } from "antd"

import { service, IResponse } from "@/net/service"
import { table } from "@/net/url"

import styles from "./index.scss"
import { PaginationProps } from "antd/lib/pagination"

interface IData {
  key: number
  mockTitle: string
  mockContent: string
  action: string
}

interface IParamsData {
  current: number
  pageSize: number
}

const Table1 = () => {
  const [data, setData] = useState<IData[]>([])
  const [pagination, setPagination] = useState<PaginationProps>({
    showQuickJumper: true,
    showTotal: (total) => `共${total}条数据`,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    onChange: (current, pageSize) => changePage(current, pageSize)
  })

  useEffect((): void => {
    getData({ current: 1, pageSize: 10 })
    return
  }, [])

  const changePage = (current: number, pageSize: number): void => {
    getData({ current, pageSize })
  }

  const getData = async ({ current = 1, pageSize = 10 }: IParamsData): Promise<void> => {
    const response: IResponse<IData[]> = await service(table.base, { method: "post", data: qs.stringify({ current, pageSize }) })
    const { code } = response
    if (code === 200) {
      const { data = [] } = response
      setData(data)
      setPagination({ ...pagination, pageSize: 10, current: 1, total: data.length })
    }
  }

  const enumAction = (action, name: string): React.ReactNode => {
    console.log(action, name)
    const mapAction = {
      download: (
        <Tag color={"volcano"}>
          <a href="#">{name}</a>
        </Tag>
      ),
      listen: (
        <Tag color={"lime"}>
          <a href="#">{name}</a>
        </Tag>
      ),
      love: (
        <Tag color={"green"}>
          <a href="#">{name}</a>
        </Tag>
      )
    }
    return mapAction[action]
  }

  const columns = [
    {
      title: "文字",
      key: "mockTitle",
      dataIndex: "mockTitle",
      render: (text, record) => text
    },
    {
      title: "内容",
      key: "mockTitle",
      dataIndex: "mockContent"
    },
    {
      title: "时间",
      key: "dateTime",
      dataIndex: "dateTime"
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      render: (text, record) => enumAction(text.action, text.name)
    }
  ]

  return (
    <div className={styles["table"]}>
      <Table size={"middle"} columns={columns} dataSource={data} pagination={pagination} />
    </div>
  )
}

export default Table1
