import MainWrapper from 'shared/components/MainWrapper'
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

export default async function AddTaskPage({ params }: Props) {
  const resolvedParams = await params
  const task = await getTask(resolvedParams.id)
  return (
    <MainWrapper>
      <div className="w-full min-h-[320px] rounded-lg p-4">
        <p className="text-xl text-gray-800 dark:text-white">Edit Task</p>
        <TaskEditForm task={task.task} />
      </div>
    </MainWrapper>
  )
}
