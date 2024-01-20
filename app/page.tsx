'use client'

import { Skeleton } from "antd"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const navigate = useRouter()
  useEffect(() => {
    navigate.push('/home')
  }, [])
  return (
    <div className="p-2">
    </div>
  )
}
