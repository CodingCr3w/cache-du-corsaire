import Skeleton from "components/ui/Skeleton"
import Row from "./Row"
import Cell from "./Cell"

type LoadingBodyProps = {
  cells: number
  rows?: number
}

export default function LoadingBody({ cells, rows = 5 }: LoadingBodyProps) {
  return (
    <tbody className="divide-y divide-gray-400">
      {Array.from({ length: rows }).map((_, i) => (
        <Row key={i}>
          {Array.from({ length: cells }).map((_, j) => (
            <Cell key={j}>
              <Skeleton className="h-8" />
            </Cell>
          ))}
        </Row>
      ))}
    </tbody>
  )
}
