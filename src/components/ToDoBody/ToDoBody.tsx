import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import getToDoList, { Data } from "../../api/getToDoList";
import putTodoList from "../../api/putTodoList";
import deleteTodoList from "../../api/deleteToDoList";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modal from "../Modal/Modal";
import { ListWrap, List, Span, Check } from "./ToDoBody.styled";

function ToDoBody() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<Data[]>({
    queryKey: ["todos"],
    queryFn: getToDoList,
  });
  const [isModal, setModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");

  const updateMutation = useMutation({
    mutationFn: putTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleCheckboxChange = (
    id: string,
    todolist: string,
    checked: boolean
  ) => {
    const updatedCheckbox = !checked;

    updateMutation.mutate({
      id,
      todolist: todolist,
      checkbox: updatedCheckbox,
    });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleClickOpen = (task: string, id: string) => {
    setSelectedTask(task);
    setSelectedTaskId(id);
    setModal(true);
  };

  const handleUpdateTask = (newTask: string) => {
    updateMutation.mutate({
      id: selectedTaskId,
      todolist: newTask,
      checkbox: false,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching todos:", error);
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <ListWrap>
      {data ? (
        data.map((todo, i) => (
          <List key={todo.id}>
            <Span>
              {i + 1}.&nbsp;{todo.todolist}
            </Span>
            <div>
              <Check
                type="checkbox"
                checked={todo.checkbox}
                onChange={() =>
                  handleCheckboxChange(todo.id, todo.todolist, todo.checkbox)
                }
              />
              <BorderColorIcon
                color="primary"
                style={{ cursor: "pointer", marginLeft: 5, marginRight: 5 }}
                onClick={() => handleClickOpen(todo.todolist, todo.id)}
              />
              <DeleteForeverIcon
                color="secondary"
                fontSize="medium"
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(todo.id)}
              />
              <Modal
                isModal={isModal}
                setModal={setModal}
                initialTask={selectedTask}
                onUpdateTask={handleUpdateTask}
              />
            </div>
          </List>
        ))
      ) : (
        <List>No todos available</List>
      )}
    </ListWrap>
  );
}

export default ToDoBody;
