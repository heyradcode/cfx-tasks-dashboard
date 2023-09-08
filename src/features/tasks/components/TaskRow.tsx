import Link from "next/link";
import { memo } from "react";
import classNames from "classnames";
import { formatDate } from "shared/utils/formatDate";
import { Task, TaskStatus } from "shared/types";
import { LazyBox } from "shared/components/LazyBox";
import ActionMenu from "./ActionMenu";

interface Props {
  task: Task;
}

const TaskRow = ({ task }: Props) => {
  const { id, status, title, description, date } = task
  return (
    <LazyBox>
      <div className="relative w-full py-2 px-4 rounded-lg shadow-lg bg-white dark:bg-slate-800">
        <div className="absolute z-20 right-0 top-2">
          <ActionMenu task={task} />
        </div>
        <Link href={`/task/${id}`} className="w-full">
          <p className="text-xl text-gray-800 dark:text-white">{title}</p>
          <p className="text-base text-slate-600 dark:text-slate-400">{description}</p>
          <div className="flex justify-between items-center mt-2">
            <p className={classNames("text-sm text-right", {
              "text-green-500": status === TaskStatus.COMPLETED,
              "text-yellow-500": status === TaskStatus.PENDING,
            })}>{status}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(new Date(date))}</p>
          </div>
        </Link>
      </div>
    </LazyBox>
  )
}

export default memo(TaskRow);
