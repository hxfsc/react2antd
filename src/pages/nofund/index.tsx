import * as React from "react"
import { Result, Button } from "antd"
import { Link } from "react-router-dom"
import * as styles from "./styles.scss"
const NoFund = () => {


    return (
        <div className={styles["nofund"]}>
            <Result
                title={"找不到页面"}
                subTitle={"确认你的页面地址"}
                status={"404"}
                extra={<Link to={"/"}><Button type={"primary"}>返回首页</Button></Link>}
            />
        </div>
    )
}

export default NoFund
