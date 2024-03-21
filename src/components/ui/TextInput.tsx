import React from "react"

import LabelWithTooltip from "./LabelWithTooltip"
import BaseInput from "./BaseInput"
import type { BasicInputProps } from "./BaseInput"

type Props = BasicInputProps & {
  label?: string
  tooltip?: string
  optional?: boolean
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, tooltip, optional, ...props }, ref) => {
    const inputId = React.useId()
    return (
      <div>
        <LabelWithTooltip {...{ id: inputId, tooltip, optional }}>
          {label}
        </LabelWithTooltip>
        <div>
          <BaseInput id={inputId} {...{ ref, ...props }} />
        </div>
      </div>
    )
  }
)

export default TextInput
