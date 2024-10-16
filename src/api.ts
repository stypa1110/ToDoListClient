import axios from 'axios';

const API_URL = 'http://localhost:5248/ToDoTasks';

export interface Task {
  taskId: number;
  name: string;
  description: string;
  taskDate: Date;
  notificationDate: Date;
}

export async function fetchTasksByDate(date: string): Promise<Task[]> {
  const response = await axios.get(`${API_URL}/gettasks?date=${date}`);
  return response.data;
}

export async function addTask(task: Task): Promise<boolean> {
  const response = await axios.post(`${API_URL}/addtask`, task);
  return response.data;
}

export async function updateTask(task: Task): Promise<Task> {
  const response = await axios.patch(`${API_URL}/edittask`, task);
  return response.data;
}

export async function deleteTask(taskId: number): Promise<boolean> {
  const response = await axios.delete(`${API_URL}/deletetask?taskId=${taskId}`);
  return response.data;
}
