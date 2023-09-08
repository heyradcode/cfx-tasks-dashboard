import { memo, useCallback } from "react"
import classNames from "classnames"
import { PopoverButton } from "./PopoverButton"
import { TaskStatus } from "shared/types";

const SORT_OPTIONS = ["Newest", "Oldest", "Title A-Z", "Title Z-A"];

interface SortOptionProps {
  option: string;
  onClick: (option: string) => void;
}
const SortOption = ({ option, onClick }: SortOptionProps) => {
  return (
    <button
      className="border-none p-0 rounded-lg h-[40px] px-2 w-full flex items-center justify-start cursor-pointer bg-transparent whitespace-nowrap"
      onClick={() => onClick(option)}
    >
      <p className="text-gray-600">{option}</p>
    </button>
  )
}

interface Props {
  filter: string;
  sort: string;
  onFilter: (filter: string) => void;
  onSearch: (search: string) => void;
  onChangeSort: (sort: string) => void;
}
const FilterBar = ({ filter, sort, onSearch, onFilter, onChangeSort }: Props) => {
  const renderSortOption = useCallback((option: string) => {
    return (
      <SortOption
        key={option}
        option={option}
        onClick={onChangeSort}
      />
    )
  }, [onChangeSort])

  return (
    <div className="flex items-center py-4 w-full sm:w-auto">
      <div className="mr-4 w-full">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 outline-none min-w-[120px] w-full sm:w-auto sm:min-w-[220px] md:min-w-[280px] rounded-lg w-full p-2 text-gray-800 h-[40px] dark:border-slate-600 dark:text-slate-100 dark:bg-slate-700"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <PopoverButton
          button={
            <div
              className="border-none p-0 rounded-lg mr-2 h-[40px] px-2 w-auto flex items-center justify-center cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-slate-500 dark:hover:bg-slate-600 text-gray-600 dark:text-white"
            >
              {!!filter ? (
                <p className="text-gray-600 mr-2 dark:text-white">
                  {filter === 'pending' ? 'Pending' : 'Completed'}
                </p>
              ) : (
                <p className="text-gray-600 mr-2 dark:text-white">All</p>
              )}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          }
        >
          <button
            className="border-none p-0 rounded-lg h-[40px] px-2 w-full flex items-center justify-start cursor-pointer bg-transparent"
            onClick={() => onFilter('')}
          >
            <p className="text-gray-600">All</p>
          </button>
          <button
            className="border-none p-0 rounded-lg h-[40px] px-2 w-full flex items-center justify-start cursor-pointer bg-transparent"
            onClick={() => onFilter('pending')}
          >
            <p className="text-gray-500">{TaskStatus.PENDING}</p>
          </button>
          <button
            className="border-none p-0 rounded-lg h-[40px] px-2 w-full flex items-center justify-start cursor-pointer bg-transparent"
            onClick={() => onFilter('completed')}
          >
            <p className="text-gray-500">{TaskStatus.COMPLETED}</p>
          </button>
        </PopoverButton>

        <PopoverButton
          button={
            <div
              className="whitespace-nowrap border-none p-0 rounded-lg px-2 mr-2 h-[40px] w-auto flex items-center justify-center cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-slate-500 dark:hover:bg-slate-600 dark:text-white"
            >
              <p className="text-gray-600 mr-2 dark:text-white">{sort}</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          }
        >
          {SORT_OPTIONS.map(renderSortOption)}
        </PopoverButton>
      </div>
    </div>
  )
}

export default memo(FilterBar)
