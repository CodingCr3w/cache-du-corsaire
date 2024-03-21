import clsx from "clsx"

type Props = {
  className?: string
  children?: React.ReactNode
}

export default function Skeleton({ className, children }: Props) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-lg bg-gray-300 shadow-md dark:bg-gray-700",
        className
      )}
    >
      {children}
    </div>
  )
}
