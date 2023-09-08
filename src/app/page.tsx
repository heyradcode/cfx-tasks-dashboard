import { Dashboard } from 'features/tasks/components'
import MainWrapper from 'shared/components/MainWrapper'
import { getTasksWithOptions as getTasksAPI } from 'services/TaskService'

async function getTasks() {
  try {
    const result = await getTasksAPI({ page: 1 })
    return { tasks: result }
  } catch (error) {
    return { tasks: [] }
  }
}

export default async function Home() {
  const tasks = await getTasks()
  return (
    <MainWrapper>
      <Dashboard data={tasks.tasks} />
    </MainWrapper>
  )
}
