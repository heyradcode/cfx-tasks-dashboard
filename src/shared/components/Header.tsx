import Link from 'next/link';
import { memo } from 'react'
import classNames from 'classnames';
import { ViewMode } from '../types'
import FilterBar from './FilterBar';

interface Props {
  mode: ViewMode;
  filter: string;
  sort: string;
  onChangeMode: (mode: ViewMode) => void;
  onFilter: (filter: string) => void;
  onSearch: (search: string) => void;
  onChangeSort: (sort: string) => void;
}

const Header = ({ mode, filter, sort, onChangeSort, onChangeMode, onSearch, onFilter }: Props) => {
  return (
    <>
      <div className="absolute z-30 right-8 -top-[42px]">
        <Link
          href="/status" className="border-none mr-2 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-black dark:stroke-white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
        </Link>
      </div>
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <FilterBar
          filter={filter}
          sort={sort}
          onSearch={onSearch}
          onFilter={onFilter}
          onChangeSort={onChangeSort}
        />
        <div className="flex justify-end items-center w-full md:w-auto">
          <Link
            href="/new"
            className="border border-transparent p-2 rounded-lg mr-2 cursor-pointer bg-transparent text-gray-600 hover:bg-white dark:text-white dark:hover:bg-slate-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Link>
          <div className="flex items-center rounded-lg bg-gray-200 dark:bg-slate-500">
            <button
              className={classNames("border-none p-2 rounded-lg cursor-pointer", {
                "bg-white text-gray-600 dark:bg-slate-600 dark:text-gray-200": mode === ViewMode.LIST,
                "bg-transparent text-gray-600 dark:text-gray-200": mode !== ViewMode.LIST,
              })}
              onClick={() => onChangeMode(ViewMode.LIST)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
            <button
              className={classNames("border-none p-2 rounded-lg cursor-pointer", {
                "bg-white text-gray-600 dark:bg-slate-600 dark:text-gray-200": mode === ViewMode.GRID,
                "bg-transparent text-gray-600 dark:text-gray-200": mode !== ViewMode.GRID,
              })}
              onClick={() => onChangeMode(ViewMode.GRID)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Header)
