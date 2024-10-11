import axios from "axios";
import { Todo } from "@/app/types/type";

const api = axios.create({
  baseURL: "http://localhost:4000",
});
//불러오기
export const getTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};

//추가
export const addTodos = async (todo: Todo): Promise<Todo> => {
  const response = await api.post("/todos", todo);
  return response.data;
};

//삭제 - id
export const deleteTodos = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`);
};

//업데이트
export const completeTodo = async (
  id: string,
  isDone: boolean
): Promise<Todo> => {
  const response = await api.patch(`/todos/${id}`, { isDone });
  return response.data;
};
