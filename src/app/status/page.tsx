import MainWrapper from 'shared/components/MainWrapper'
import { StatusChart } from 'features/tasks/components'

export default function StatusPage() {
  return (
    <MainWrapper>
      <div className="w-full min-h-[320px] rounded-lg p-4">
        <StatusChart />
      </div>
    </MainWrapper>
  )
}
