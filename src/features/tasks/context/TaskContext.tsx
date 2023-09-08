import React, { use, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Task, TaskStatus, SortOption } from 'shared/types'
import {
  createTask,
  updateTask,
  deleteTask as deleteTaskAPI,
  getTasksWithOptions,
} from 'services/TaskService'
import { sortTask } from 'shared/utils/sortTask'

interface TaskProviderType {
  filter: string,
  sort: string,
  search: string,
  tasks: Task[],
  status: { pending: number, completed: number },
  initialized: boolean,
  page: number,
  initialize: (tasks: Task[]) => void,
  setFilter: (filter: string) => void,
  setSort: (sort: string) => void,
  setSearch: (search: string) => void,
  addTask: (task: Task) => void,
  editTask: (task: Task) => void,
  deleteTask: (task: Task) => void,
  prevPage: () => void,
  nextPage: () => void,
}

const TaskContext = React.createContext<TaskProviderType>({
  filter: '',
  search: '',
  sort: SortOption.NEWEST,
  tasks: [],
  initialized: false,
  page: 1,
  status: { pending: 0, completed: 0 },
  initialize: () => null,
  setFilter: () => null,
  setSort: () => null,
  setSearch: () => null,
  addTask: () => null,
  editTask: () => null,
  deleteTask: () => null,
  prevPage: () => null,
  nextPage: () => null,
})

const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState<string>('')
  const [sort, setSort] = useState<string>(SortOption.NEWEST)
  const [search, setSearch] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [initialized, setInitialized] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  const initialize = useCallback((data: Task[]) => {
    setTasks(data)
    setInitialized(true)
  }, [])

  const addTask = useCallback(async (task: Task) => {
    const res = await createTask(task)
    if (res) {
      setTasks((prev) => [...prev, res])
    }
  }, [])

  const prevPage = useCallback(async () => {
    if (page > 1) {
      const res = await getTasksWithOptions({ page: page - 1 })
      setTasks(res)
      setPage(page - 1)
    }
  }, [page])

  const nextPage = useCallback(async () => {
    if (tasks.length < 10) return
    const res = await getTasksWithOptions({ page: page + 1 })
    if (res.length > 0) {
      setTasks(res)
      setPage(page + 1)
    }
  }, [page, tasks])
  
  const editTask = useCallback(async (task: Task) => {
    const res = await updateTask(task.id, task)
    if (res) {
      setTasks((prev) => prev.map((t) => (t.id === res.id ? res : t)))
    }
  }, [])

  const deleteTask = useCallback(async (task: Task) => {
    await deleteTaskAPI(task.id)
    setTasks((prev) => prev.filter((t) => t.id !== task.id))
  }, [])

  const status = useMemo(() => {
    const pending = tasks.filter((task) => task.status === TaskStatus.PENDING).length
    const completed = tasks.filter((task) => task.status === TaskStatus.COMPLETED).length
    return { pending, completed }
  }, [tasks])

  const filteredTasks = useMemo(() => {
    if (!filter && !search) {
      return [...tasks].sort(sortTask(sort))
    }
    const searchedTasks = tasks.filter(task => (
      task.title.toLowerCase().includes(search.toLowerCase())
      || task.description.toLowerCase().includes(search.toLowerCase())
    ))
    if (!filter) {
      return searchedTasks.sort(sortTask(sort))
    }

    return searchedTasks
      .filter(task => task.status.toLowerCase() === filter)
      .sort(sortTask(sort))
  }, [filter, sort, search, tasks])

  return (
    <TaskContext.Provider
      value={{
        filter,
        sort,
        status,
        initialized,
        tasks: filteredTasks,
        search,
        page,
        initialize,
        setFilter,
        setSort,
        addTask,
        editTask,
        deleteTask,
        setSearch,
        prevPage,
        nextPage,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

const useTaskContenxt = () => {
  return useContext(TaskContext)
}

export { TaskProvider, useTaskContenxt }
