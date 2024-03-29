import React from "react"

export default function Pen(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.5858 3.58579C14.3669 2.80474 15.6332 2.80474 16.4143 3.58579C17.1953 4.36683 17.1953 5.63316 16.4143 6.41421L15.6214 7.20711L12.793 4.37868L13.5858 3.58579Z"
        fill="currentColor"
      />
      <path
        d="M11.3787 5.79289L3.00006 14.1716V17H5.82849L14.2072 8.62132L11.3787 5.79289Z"
        fill="currentColor"
      />
    </svg>
  )
}
