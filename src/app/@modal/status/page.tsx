import Modal from "shared/components/Modal";
import { StatusChart } from 'features/tasks/components'

export default function StatusModal() {
  return (
    <Modal>
      <div className="w-full min-h-[320px] bg-white rounded-lg p-4 dark:bg-slate-800">
        <StatusChart />
      </div>
    </Modal>
  )
}
