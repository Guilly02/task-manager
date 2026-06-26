import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTasks = (search = "", status = "all") =>
  API.get("/tasks/", { params: { search, status } });

export const createTask = (data) =>
  API.post("/tasks/", data);

export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

export const toggleTask = (id) =>
  API.patch(`/tasks/${id}/toggle`);

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);