"use client"

import { useState, useRef, useCallback } from "react"

export interface FileAttachment {
  name: string
  size: number
  type: string
  base64: string
}

interface UseFileUploadResult {
  file: FileAttachment | null
  error: string | null
  inputRef: React.RefObject<HTMLInputElement | null>
  selectFile: () => void
  removeFile: () => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MAX_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

export function useFileUpload(): UseFileUploadResult {
  const [file, setFile] = useState<FileAttachment | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const selectFile = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const removeFile = useCallback(() => {
    setFile(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ""
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return

    setError(null)

    if (!ALLOWED_TYPES.includes(f.type)) {
      setError("Hanya file PDF atau DOCX yang diizinkan")
      return
    }

    if (f.size > MAX_SIZE) {
      setError("Ukuran file maksimal 10MB")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setFile({
        name: f.name,
        size: f.size,
        type: f.type,
        base64: reader.result as string,
      })
    }
    reader.readAsDataURL(f)
  }, [])

  return { file, error, inputRef, selectFile, removeFile, handleFileChange }
}
