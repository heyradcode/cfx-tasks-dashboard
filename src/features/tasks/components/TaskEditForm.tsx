'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { TaskStatus, Task } from 'shared/types'
import TaskForm from './TaskForm'
import { useTaskContenxt } from '../context/TaskContext'

interface Props {
  task?: Task;
}

export default function TaskEditForm({ task }: Props) {
  const router = useRouter()
  const {
    addTask,
    editTask,
    deleteTask,
  } = useTaskContenxt()
  const [values, setValues] = useState<{ title: string; description: string }>({
    title: task?.title ?? '',
    description: task?.description ?? '',
  })
  const [completed, setCompleted] = useState<boolean>(task?.status === TaskStatus.COMPLETED)

  const handleChangeValues = useCallback((field: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const handleRemoveTask = useCallback(async () => {
    if (task?.id) {
      await deleteTask(task)
      router.back()
    }
  }, [task, router, deleteTask])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const {title, description} = values
    if (task?.id) {
      await editTask({
        ...task,
        title: title,
        description: description,
        status: completed ? TaskStatus.COMPLETED : TaskStatus.PENDING,
        date: new Date().toISOString(),
      })
      router.back()
    } else {
      await addTask({
        id: Date.now(),
        title: title,
        description: description,
        status: TaskStatus.PENDING,
        date: new Date().toISOString(),
      })
    }
    router.back()
  }, [
    task,
    router,
    editTask,
    values,
    completed,
    addTask
  ])

  return (
    <TaskForm
      values={values}
      isEdit={!!task}
      onChangeValue={handleChangeValues}
      onSubmit={handleSubmit}
      markedCompleted={completed}
      onMarkCompleted={setCompleted}
      onDelete={handleRemoveTask}
    />
  )
}
