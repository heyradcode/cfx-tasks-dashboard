'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { Task, ViewMode } from 'shared/types'
import Header from 'shared/components/Header'
import PaginatonFooter from 'shared/components/PaginatonFooter'
import TaskCard from './TaskCard'
import TaskRow from './TaskRow'
import { useTaskContenxt } from '../context/TaskContext'

interface Props {
  data: Task[]
}

export default function Dashboard({ data }: Props) {
  const {
    initialize,
    tasks,
    filter,
    sort,
    page,
    prevPage,
    nextPage,
    setSearch,
    setFilter,
    setSort
  } = useTaskContenxt()
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID)

  const handleViewMode = useCallback((mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem('viewMode', mode)
  }, [])

  const handleFilter = useCallback((value: string) => {
    setFilter(value !== filter ? value : '')
  }, [setFilter, filter])

  const handleSort = useCallback((value: string) => {
    setSort(value)
  }, [setSort])

  useEffect(() => {
    initialize(data)
  }, [data, initialize])

  useEffect(() => {
    const mode = localStorage.getItem('viewMode') as ViewMode
    setViewMode(mode ?? ViewMode.GRID)
  }, [])

  const renderTaskItem = useCallback((task: Task) => {
    if (viewMode === ViewMode.LIST) {
      return <TaskRow key={task.id} task={task} />
    }
    return <TaskCard key={task.id} task={task} />
  }, [viewMode])

  return (
    <div className="w-full z-20">
      <Header
        mode={viewMode}
        onChangeMode={handleViewMode}
        onFilter={handleFilter}
        onSearch={setSearch}
        onChangeSort={handleSort}
        filter={filter}
        sort={sort ?? 'asc'}
      />
      <div className={classNames("grid gap-4", {
        "grid-cols-1": viewMode === ViewMode.LIST,
        "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4": viewMode === ViewMode.GRID,
      })}>
        {tasks.map(renderTaskItem)}
      </div>
      <PaginatonFooter
        page={page}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  )
}
