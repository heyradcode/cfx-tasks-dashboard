import axios from "axios"
import { BASE_API_URL } from "shared/environment"

export const getTasks = async () => {
  const response = await axios.get(`${BASE_API_URL}/tasks`)
  return response.data
}

export const getTasksWithOptions = async (options: any) => {
  const { page = 1, limit = 10 } = options
  const response = await axios.get(`${BASE_API_URL}/tasks?_page=${page}&_limit=${limit}`)
  return response.data
}

export const getTask = async (id: string) => {
  const response = await axios.get(`${BASE_API_URL}/tasks/${id}`)
  return response.data
}

export const createTask = async (task: any) => {
  const response = await axios.post(`${BASE_API_URL}/tasks`, task)
  return response.data
}

export const updateTask = async (id: number, task: any) => {
  const response = await axios.put(`${BASE_API_URL}/tasks/${id}`, task)
  return response.data
}

export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${BASE_API_URL}/tasks/${id}`)
  return response.data
}
