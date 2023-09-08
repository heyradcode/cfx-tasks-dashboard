import { useRouter } from 'next/navigation';
import { memo } from 'react'

interface Props {
  values: { title: string; description: string };
  isEdit?: boolean;
  markedCompleted?: boolean;
  onMarkCompleted?: (value: boolean) => void;
  onChangeValue: (field: string, value: any) => void;
  onSubmit: (task: any) => void;
  onDelete?: () => void;
}

export const TaskForm = ({
  values,
  isEdit,
  markedCompleted,
  onMarkCompleted,
  onChangeValue,
  onSubmit,
  onDelete,
}: Props) => {
  const router = useRouter()

  return (
    <div className="w-full">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col space-y-2">
          <div className="w-full">
            <label className="text-gray-600 dark:text-slate-400">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="border border-gray-300 outline-none rounded-lg w-full p-2 mt-2 text-gray-800 dark:border-slate-600 dark:text-slate-100 dark:bg-slate-700"
              placeholder="Enter title"
              name="title"
              value={values?.title}
              onChange={(e) => onChangeValue('title', e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="text-gray-600 dark:text-slate-400">Description <span className="text-red-500">*</span></label>
            <textarea
              className="border border-gray-300 outline-none rounded-lg p-2 w-full mt-2 text-gray-800 dark:border-slate-600 dark:text-slate-100 dark:bg-slate-700"
              rows={5}
              placeholder="Enter description"
              name="description"
              value={values?.description}
              onChange={(e) => onChangeValue('description', e.target.value)}
            />
          </div>
          {isEdit && (
            <div className="w-full flex items-center">
              <input
                type="checkbox"
                className="border border-gray-300 rounded-lg p-2 text-gray-800"
                checked={markedCompleted}
                onChange={(e) => onMarkCompleted?.(e.target.checked)}
              />
              <label className="text-gray-600 ml-2 dark:text-slate-300">Mark as completed</label>
            </div>
          )}
          <div className="w-full pt-[8px] flex items-center justify-between">
            {isEdit && (
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => onDelete?.()}
              >
                Delete
              </button>
            )}
            <div className="w-full flex items-center justify-end">
              <button type="button" className="text-gray-500" onClick={() => router.back()}>Cancel</button>
              <button type="submit" disabled={!values?.title || !values?.description} className="ml-6 bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-[0.5]">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default memo(TaskForm)
