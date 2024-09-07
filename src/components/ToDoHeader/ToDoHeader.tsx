import "./ToDoHeader.css";
import { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postTodoList from "../../api/postTodoList";
import ToDoBody from "../ToDoBody/ToDoBody";
import * as Yup from "yup";

const validationSchema = Yup.object({
  newTodo: Yup.string()
    .required("Task is required")
    .min(2, "Task should be at least 2 characters"),
});

function ToDoHeader() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState<string>("");
  const [error, setError] = useState<string>("");

  const mutation = useMutation({
    mutationFn: postTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const addTodoList = async (): Promise<void> => {
    try {
      await validationSchema.validate({ newTodo }, { abortEarly: false });

      setError("");

      mutation.mutate(newTodo);
      setNewTodo("");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.errors[0]);
      }
    }
  };

  return (
    <div className="todo-header-wrap">
      <div>
        <h2>Add to do list</h2>
      </div>
      <div>
        <Input
          placeholder={error ? error : "Enter task"}
          style={{ flex: 1 }}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          error={!!error}
          sx={{
            "& .MuiInputBase-input::placeholder": {
              color: error ? "red" : "gray",
            },
          }}
        />
        <Button
          color="primary"
          size="medium"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            marginLeft: 10,
          }}
          onClick={addTodoList}
        >
          Add
        </Button>
      </div>
      <ToDoBody />
    </div>
  );
}

export default ToDoHeader;
