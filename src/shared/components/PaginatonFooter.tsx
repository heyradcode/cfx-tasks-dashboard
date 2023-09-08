import { memo } from "react"

interface Props {
  page: number;
  nextPage: () => void;
  prevPage: () => void;
}
const PaginationFooter = ({ page, nextPage, prevPage }: Props) => {
  return (
    <div className="w-full flex justify-center items-center mt-4">
      <button
        className="border-none p-0 rounded-lg mr-2 h-[40px] w-[40px] flex items-center justify-center cursor-pointer bg-white hover:bg-gray-200 text-gray-600 dark:text-white dark:bg-slate-500 dark:hover:bg-slate-600"
        disabled={page < 2}
        onClick={prevPage}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <div className="min-w-[40px] h-[40px] flex items-center justify-center text-gray-700 mr-2 dark:text-white">{page}</div>
      <button
        className="border-none p-0 rounded-lg mr-2 h-[40px] w-[40px] flex items-center justify-center cursor-pointer bg-white hover:bg-gray-200 text-gray-600 dark:text-white dark:bg-slate-500 dark:hover:bg-slate-600"
        onClick={nextPage}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  )
}

export default memo(PaginationFooter)
