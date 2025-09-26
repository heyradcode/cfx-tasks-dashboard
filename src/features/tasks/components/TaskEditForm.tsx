'use client'

import { Task } from 'shared/types'
import TaskFormAction from './TaskFormAction'

interface Props {
  task?: Task;
}

export default function TaskEditForm({ task }: Props) {
  return (
    <TaskFormAction
      task={task}
      isEdit={!!task}
    />
  )
}
