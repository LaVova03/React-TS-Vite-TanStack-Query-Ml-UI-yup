import axios from "axios";
import { API } from "../constants";
import { Data } from "./getToDoList";

async function postTodoList(newTodo: string): Promise<Data[]> {
  try {
    const response = await axios.post(`${API}Products`, {
      todolist: newTodo,
      checkbox: false,
    });
    return response.data;
  } catch (error) {
    console.error("postTodoList error", error);
    throw error;
  }
}

export default postTodoList;
