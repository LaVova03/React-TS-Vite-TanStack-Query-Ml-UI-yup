import axios from "axios";
import { API } from "../constants";

export interface Data {
  todolist: string;
  checkbox: boolean;
  id: string;
}

async function putTodoList(obj: Data): Promise<void> {
  try {
    await axios.put(`${API}Products/${obj.id}`, obj);
  } catch (error) {
    console.error("put ToDoList error", error);
    throw error;
  }
}

export default putTodoList;
