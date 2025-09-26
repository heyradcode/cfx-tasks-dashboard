'use client'

import { useActionState, useOptimistic } from 'react'
import { useRouter } from 'next/navigation'
import { Task, TaskStatus } from 'shared/types'
import { createTask, updateTask, deleteTask as deleteTaskAPI } from 'services/TaskService'

interface TaskFormState {
  success: boolean
  error?: string
  task?: Task
}

interface TaskFormActionProps {
  task?: Task
  isEdit?: boolean
}

const initialState: TaskFormState = {
  success: false,
  error: undefined,
  task: undefined
}

async function taskFormAction(
  prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  try {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const status = formData.get('status') as string
    const taskId = formData.get('taskId') as string
    const action = formData.get('action') as string

    if (!title || !description) {
      return {
        success: false,
        error: 'Title and description are required'
      }
    }

    const taskData = {
      title,
      description,
      status: status === 'completed' ? TaskStatus.COMPLETED : TaskStatus.PENDING,
      date: new Date().toISOString()
    }

    if (action === 'delete' && taskId) {
      await deleteTaskAPI(parseInt(taskId))
      return { success: true, task: undefined }
    }

    if (action === 'update' && taskId) {
      const updatedTask = await updateTask(parseInt(taskId), {
        id: parseInt(taskId),
        ...taskData
      })
      return { success: true, task: updatedTask }
    }

    if (action === 'create') {
      const newTask = await createTask({
        id: Date.now(),
        ...taskData
      })
      return { success: true, task: newTask }
    }

    return {
      success: false,
      error: 'Invalid action'
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred'
    }
  }
}

export default function TaskFormAction({ task, isEdit = false }: TaskFormActionProps) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(taskFormAction, initialState)
  
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    task ? [task] : [],
    (state, newTask: Task) => [...state, newTask]
  )

  // Handle successful form submission
  if (state.success && state.task) {
    // Navigate back after successful submission
    router.back()
  }

  return (
    <div className="w-full">
      <form action={formAction} className="flex flex-col space-y-4">
        <input type="hidden" name="taskId" value={task?.id || ''} />
        <input type="hidden" name="action" value={isEdit ? 'update' : 'create'} />
        
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            defaultValue={task?.title || ''}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter title"
            required
            disabled={isPending}
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            defaultValue={task?.description || ''}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter description"
            required
            disabled={isPending}
          />
        </div>

        {isEdit && (
          <div className="w-full">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="status"
                value="completed"
                defaultChecked={task?.status === TaskStatus.COMPLETED}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={isPending}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Mark as completed
              </span>
            </label>
          </div>
        )}

        {state.error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          {isEdit && (
            <button
              type="submit"
              name="action"
              value="delete"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </button>
          )}
          
          <div className="flex items-center space-x-3 ml-auto">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isPending}
            >
              {isPending ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
