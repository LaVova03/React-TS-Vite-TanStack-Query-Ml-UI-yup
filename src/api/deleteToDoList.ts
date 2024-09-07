import axios from "axios";
import { API } from "../constants";

async function deleteTodoList(id: string): Promise<void> {
  try {
    await axios.delete(`${API}Products/${id}`);
  } catch (error) {
    console.error("delete ToDoList error", error);
    throw error;
  }
}

export default deleteTodoList;
