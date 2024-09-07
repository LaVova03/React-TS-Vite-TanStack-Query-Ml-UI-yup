import axios from "axios";
import { API } from "../constants";

export interface Data {
  todolist: string;
  checkbox: boolean;
  id: string;
}

async function getToDoList(): Promise<Data[]> {
  try {
    const { data } = await axios.get<Data[]>(`${API}Products`);
    return data;
  } catch (error) {
    console.error("get ToDoList error", error);
    return []; 
  }
}

export default getToDoList;
