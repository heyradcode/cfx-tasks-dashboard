import Modal from "shared/components/Modal"
import { TaskEditForm } from 'features/tasks/components'
import { getTask as getTaskAPI } from 'services/TaskService'

type Props = {
  params: { id: string }
}

async function getTask(taskId: string) {
  try {
    const result = await getTaskAPI(taskId)
    return { task: result }
  } catch (error) {
    return { task: undefined }
  }
}

export default async function AddTaskModal({ params }: Props) {
  const task = await getTask(params.id)
  return (
    <Modal>
      <div className="w-full min-h-[320px] bg-white rounded-lg p-4 dark:bg-slate-800">
        <p className="text-xl text-gray-800 dark:text-white">Edit Task</p>
        <TaskEditForm task={task.task} />
      </div>
    </Modal>
  )
}
