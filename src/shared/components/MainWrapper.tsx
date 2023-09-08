import SwitchDarkLight from "./SwitchDarkLight"

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-4 pt-16 md:p-16 bg-gradient-body dark:bg-gradient-body-dark bg-[#d6dbdc] dark:bg-black">
      <div className="absolute z-30 top-[16px] left-4 md:left-16 text-[32px] text-black dark:text-white">
        CFX Tasks
      </div>
      <div className="absolute z-30 top-[20px] right-4 md:right-16 flex justify-end items-center">
        <SwitchDarkLight />
      </div>
      <div className="relative w-full flex-1 flex before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        {children}
      </div>
    </main>
  )
}
