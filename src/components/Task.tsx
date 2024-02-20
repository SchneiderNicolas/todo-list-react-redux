import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Paper,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { ITask } from "../models/ITask";
import { deleteTask, editTask } from "../redux/tasksSlice";

interface TaskProps {
  task: ITask;
}

const Task = ({ task }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask({ id: task.id, status: task.status }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(
      editTask({
        id: task.id,
        title: editedTitle,
        description: editedDescription,
      })
    );
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Paper
        elevation={3}
        style={{
          padding: "16px",
          marginBottom: "8px",
          borderRadius: "8px",
          backgroundColor: "#0B0A0D",
          border: "1px solid #212227",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Title"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          sx={{
            marginBottom: "4px",
            "& .MuiOutlinedInput-input": {
              padding: "10px 14px",
              backgroundColor: "#18191D",
              color: "#FFFFFF",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF7051",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF7051",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#B8BFCB",
            },
          }}
        />
        <TextField
          fullWidth
          multiline
          variant="outlined"
          placeholder="Description"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          error={editedDescription.length > 200}
          inputProps={{
            maxLength: 200,
          }}
          sx={{
            marginBottom: "8px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#18191D",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF7051",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF7051",
              },
              "& .MuiOutlinedInput-input": {
                color: "#FFFFFF",
              },
              "& .MuiOutlinedInput-multiline": {
                padding: 0,
              },
            },
            "& .MuiInputLabel-root": {
              color: "#B8BFCB",
            },

            backgroundColor: "#18191D",
          }}
        />
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ color: "#FFFFFF", marginBottom: "8px" }}
        >
          {editedDescription.length}/200
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleSave}
            sx={{
              color: "#FF7051",
              marginRight: "8px",
              "&:hover": {
                backgroundColor: "rgba(255, 112, 81, 0.2)",
              },
              "& .MuiButton-startIcon": {
                color: "#FF7051",
              },
            }}
            startIcon={<EditIcon />}
          >
            Edit Task
          </Button>
          <IconButton
            aria-label="cancel"
            onClick={() => setIsEditing(false)}
            sx={{
              color: "#FF7051",
              "&:hover": {
                backgroundColor: "rgba(255, 112, 81, 0.2)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      style={{
        padding: "16px",
        marginBottom: "8px",
        position: "relative",
        borderRadius: "8px",
        backgroundColor: "#0B0A0D",
        border: "1px solid #212227",
      }}
    >
      <Typography sx={{ fontWeight: "bold", color: "#FFFFFF" }} variant="h6">
        {task.title}
      </Typography>
      <Typography
        variant="body1"
        style={{ marginBottom: "38px", color: "#B8BFCB" }}
      >
        {task.description}
      </Typography>
      <Box
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          display: "flex",
          gap: "2px",
        }}
      >
        <IconButton
          aria-label="edit"
          onClick={handleEdit}
          sx={{
            color: "#FF7051",
            "&:hover": {
              backgroundColor: "rgba(255, 112, 81, 0.2)",
              borderRadius: "50%",
            },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          sx={{
            color: "#FF7051",
            "&:hover": {
              backgroundColor: "rgba(255, 112, 81, 0.2)",
              borderRadius: "50%",
            },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Task;
