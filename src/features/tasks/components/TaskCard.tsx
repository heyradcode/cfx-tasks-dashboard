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

const TaskCard = ({ task }: Props) => {
  const { id, status, title, description, date } = task
  return (
    <LazyBox>
      <div className="relative w-full h-full shadow-lg p-4  bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <div className="absolute z-20 right-0 top-2">
          <ActionMenu task={task} />
        </div>
        <Link href={`/task/${id}`} className="w-full">
          <p className="text-xl text-gray-800 dark:text-white">{title}</p>
          <p className="text-base text-slate-600 pb-[18px] dark:text-slate-400">{description}</p>
          <p className={classNames("absolute left-[12px] bottom-[12px] text-sm text-right", {
            "text-green-500": status === TaskStatus.COMPLETED,
            "text-yellow-500": status === TaskStatus.PENDING,
          })}>{status}</p>
          <div className="flex justify-end items-center absolute right-[12px] bottom-[12px]">
            <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(new Date(date))}</p>
          </div>
        </Link>
      </div>
    </LazyBox>
  )
}

export default memo(TaskCard);
