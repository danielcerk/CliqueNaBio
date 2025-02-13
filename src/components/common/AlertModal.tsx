"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

type AlertType = "success" | "error" | "info"

interface AlertModalProps {
  type: AlertType
  message: string
  isOpen: boolean
  onClose: () => void
}

export function AlertModal({ type, message, isOpen, onClose }: AlertModalProps) {
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />
      case "error":
        return <XCircle className="h-6 w-6 text-red-500" />
      case "info":
        return <AlertCircle className="h-6 w-6 text-blue-500" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50"
      case "error":
        return "bg-red-50"
      case "info":
        return "bg-blue-50"
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`sm:max-w-[425px] ${getBackgroundColor()}`}>
        <VisuallyHidden>
          <DialogTitle>Alerta</DialogTitle>
        </VisuallyHidden>
        <div className="flex items-center gap-4">
          {getIcon()}
          <p className="text-sm font-medium">{message}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
