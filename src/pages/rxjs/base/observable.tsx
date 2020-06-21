import * as React from "react"
import { useObservable } from "rxjs-hooks"
import { interval } from "rxjs"
import { map } from "rxjs/operators"

const Observable = () => {
  const value = useObservable(() => interval(1000).pipe(map((val) => val * 3)))
  return <div>延迟增加+1: {value}</div>
}

export default Observable
