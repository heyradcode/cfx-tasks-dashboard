'use client'

import { useMemo } from "react"
import BarChart from "shared/components/BarChart"
import { useTaskContenxt } from "../context/TaskContext"

export default function StatusChart() {
  const { status: { pending, completed } } = useTaskContenxt()

  const statusData = useMemo(() => {
    return {
      labels: ['Pending', 'Completed'],
      values: [pending, completed]
    }
  }, [pending, completed])

  return (
    <BarChart data={statusData} />
  )
}
