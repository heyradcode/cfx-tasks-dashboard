import Modal from "shared/components/Modal"
import { TaskEditForm } from 'features/tasks/components'

export default function AddTaskModal() {
  return (
    <Modal>
      <div className="w-full min-h-[320px] bg-white rounded-lg p-4 dark:bg-slate-800">
        <p className="text-xl text-gray-800 dark:text-white">Add New Task</p>
        <TaskEditForm />
      </div>
    </Modal>
  )
}
