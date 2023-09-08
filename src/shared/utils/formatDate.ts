export const formatDate = (date: Date) => {
  if (!date) return ""

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`
}
