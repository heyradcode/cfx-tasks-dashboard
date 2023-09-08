import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { memo, useCallback, Fragment } from 'react'
import { useTaskContenxt } from '../context/TaskContext'
import { Task, TaskStatus } from 'shared/types';

interface Props {
  task: Task;
}
const ActionMenu = ({ task }: Props) => {
  const { id, status } = task
  const {
    deleteTask,
    editTask,
  } = useTaskContenxt()

  const handleMarkAsCompleted = useCallback(() => {
    editTask({
      ...task,
      status: TaskStatus.COMPLETED,
    })
  }, [task, editTask])

  const handleDeleteTask = useCallback(() => {
    deleteTask(task)
  }, [task, deleteTask])

  return (
    <Menu>
			<div>
				<Menu.Button className="px-2 py-1 rounded-sm border-none text-gray-600 dark:text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					className="absolute right-0 mt-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none top-0"
				>
					<div className="px-1 py-1 ">
            <>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/task/${id}`}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Edit
                  </Link>
                )}
              </Menu.Item>
              {status === TaskStatus.PENDING && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={handleMarkAsCompleted}
                    >
                      Mark as completed
                    </button>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleDeleteTask}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
  )
}

export default memo(ActionMenu)
