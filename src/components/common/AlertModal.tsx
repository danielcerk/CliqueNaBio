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

  const getStyles = () => {
    switch (type) {
      case "success":
        return { bg: "bg-green-50", text: "text-green-800", icon: <CheckCircle2 className="h-6 w-6 text-green-600" /> }
      case "error":
        return { bg: "bg-red-50", text: "text-red-800", icon: <XCircle className="h-6 w-6 text-red-600" /> }
      case "info":
        return { bg: "bg-blue-50", text: "text-blue-800", icon: <AlertCircle className="h-6 w-6 text-blue-600" /> }
      default:
        return { bg: "bg-gray-50", text: "text-gray-800", icon: null }
    }
  }

  const { bg, text, icon } = getStyles()

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`sm:max-w-[425px] text-gray-600 ${bg}`}>
        <VisuallyHidden>
          <DialogTitle>Alerta</DialogTitle>
        </VisuallyHidden>
        <div className="flex items-center gap-4">
          {icon}
          <p className={`text-sm font-medium ${text}`}>{message}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
