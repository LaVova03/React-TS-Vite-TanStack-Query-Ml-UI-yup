import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form } from "./Modal.styled";

interface ModalProps {
  isModal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  initialTask: string;
  onUpdateTask: (newTask: string) => void;
}

function Modal({ isModal, setModal, initialTask, onUpdateTask }: ModalProps) {
  const [task, setTask] = useState<string>(initialTask);

  const handleClose = () => {
    setModal(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (task !== initialTask) {
      onUpdateTask(task);
    }
    handleClose();
  };

  useEffect(() => {
    setTask(initialTask);
  }, [initialTask]);

  return (
    <Dialog open={isModal} onClose={handleClose}>
      <Form onSubmit={handleSubmit}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Update the selected task.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}

export default Modal;
