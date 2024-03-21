import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import clsx from "clsx"
import { motion } from "framer-motion"

type Props = {
  open: boolean
  onClose?: () => void
  large?: boolean
  /**
   * If true, outside elements won't be interactable
   */
  modal?: boolean
  children: React.ReactNode
}

const DialogContent = motion(Dialog.Content)
const DialogOverlay = motion(Dialog.Overlay)

function Modal({ open, large = false, modal, onClose, children }: Props) {
  return (
    <Dialog.Root {...{ open, modal }} onOpenChange={onClose}>
      <Dialog.Portal>
        <DialogOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          className="fixed inset-0 w-screen overflow-y-auto bg-gray-500 bg-opacity-75"
        >
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <DialogContent
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.2 },
              }}
              className={clsx(
                "overflow-hidden rounded-lg text-left shadow-xl",
                "mx-4 my-8 md:mx-auto md:my-auto",
                "px-4 pt-5 pb-4 sm:p-6",
                "bg-surface-900",
                large ? "w-full md:w-fit" : "w-full max-w-sm"
              )}
            >
              {children}
            </DialogContent>
          </div>
        </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type ModalTitleProps = {
  className?: string
  children: React.ReactNode
}

function ModalTitle({ className, children }: ModalTitleProps) {
  return (
    <Dialog.Title asChild>
      <h3
        className={clsx(
          "text-lg font-medium text-center leading-6 text-gray-50",
          className
        )}
      >
        {children}
      </h3>
    </Dialog.Title>
  )
}
Modal.Title = ModalTitle

function ModalSubtitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-center text-gray-400">{children}</p>
}
Modal.Subtitle = ModalSubtitle

type ModalIconProps = {
  children: React.ReactElement
}

function ModalIcon({ children }: ModalIconProps) {
  return (
    <div className="flex items-center justify-center w-12 h-12 mx-auto text-white rounded-full bg-primary-main">
      {React.cloneElement(children, {
        className: clsx(children.props.className, "h-6 w-6"),
        "aria-hidden": "true",
      })}
    </div>
  )
}
Modal.Icon = ModalIcon

function ModalBody(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "my-4 mb-8 text-sm text-gray-500 dark:text-gray-200",
        props.className
      )}
    />
  )
}
Modal.Body = ModalBody

type ModalActionsProps = {
  children: React.ReactNode
}

function ModalActions({ children }: ModalActionsProps) {
  return (
    <div className="grid grid-flow-row-dense gap-3 md:grid-cols-2">
      {children}
    </div>
  )
}
Modal.Actions = ModalActions

function ModalProgress({ progress }: { progress: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ stiffness: 100 }}
        className="h-full bg-primary-main"
      />
    </div>
  )
}
Modal.Progress = ModalProgress

export default Modal
