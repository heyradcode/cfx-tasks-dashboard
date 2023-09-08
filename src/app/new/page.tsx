import MainWrapper from 'shared/components/MainWrapper'
import { TaskEditForm } from 'features/tasks/components'

export default function AddTaskPage() {
  return (
    <MainWrapper>
      <div className="w-full min-h-[320px] rounded-lg p-4">
        <p className="text-xl text-gray-800 dark:text-white">Add New Task</p>
        <TaskEditForm />
      </div>
    </MainWrapper>
  )
}
