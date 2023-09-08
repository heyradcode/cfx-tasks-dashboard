import { Task, SortOption } from "shared/types";

export const sortTask = (sort: string) => (a: Task, b: Task) => {
  if (sort === SortOption.NEWEST) {
    return new Date(a.date) < new Date(b.date) ? 1 : -1
  }
  if (sort === SortOption.OLDEST) {
    return new Date(a.date) > new Date(b.date) ? 1 : -1
  }
  if (sort === SortOption.A_TO_Z) {
    return a.title > b.title ? 1 : -1
  }
  return a.title < b.title ? 1 : -1
}
