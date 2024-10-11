"use client";

import { useEffect, useState } from "react";
import { Todo } from "@/app/types/type";
import { getTodos, addTodos, deleteTodos, completeTodo } from "../utils/server";

export default function TodosPages() {
  const [todos, setTodos] = useState<Todo[]>([]); //목록
  const [title, setTitle] = useState(""); //할일
  const [contents, setContent] = useState(""); // 내용

  //데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTodos();
      setTodos(data);
    };

    fetchData();
  }, []);

  //추가
  const handleAddTodo = async () => {
    const newTodo: Omit<Todo, "id"> = {
      title,
      contents,
      isDone: false,
    };

    try {
      const addedTodo = await addTodos(newTodo as Todo);
      setTodos((prev) => [...prev, addedTodo]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log("추가 중 error", error);
    }
  };

  //삭제
  const handleDelteTodo = async (id: string) => {
    try {
      await deleteTodos(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log("삭제 중 error", error);
    }
  };

  //완료 - 취소 완료 나오기 toggle
  const handleToggleComplete = async (id: string, isDone: boolean) => {
    try {
      const updateTodo = await completeTodo(id, isDone);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updateTodo : todo))
      );
    } catch (error) {
      console.log("업뎃 중 error", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={contents}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAddTodo}>추가</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.contents}</p>
            <button
              onClick={() => {
                handleDelteTodo(todo.id);
              }}
            >
              삭제
            </button>
            <button
              onClick={() => {
                handleToggleComplete(todo.id, !todo.isDone);
              }}
            >
              {todo.isDone ? "취소" : "완료"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
