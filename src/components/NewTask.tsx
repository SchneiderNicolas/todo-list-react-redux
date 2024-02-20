import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface NewTaskProps {
  onAdd: (title: string, description: string) => void;
  onCancel: () => void;
}

const NewTask = ({ onAdd, onCancel }: NewTaskProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ title: "", description: "" });

  const validate = () => {
    let tempErrors = { title: "", description: "" };
    let isValid = true;
    if (!title.trim()) {
      tempErrors.title = "Title is required";
      isValid = false;
    }
    if (description.length > 200) {
      tempErrors.description = "Description cannot exceed 200 characters";
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const handleAdd = () => {
    if (validate()) {
      onAdd(title, description);
      setTitle("");
      setDescription("");
      setErrors({ title: "", description: "" });
    }
  };

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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={!!errors.title}
        helperText={errors.title}
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!errors.description}
        helperText={errors.description}
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
        {description.length}/200
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          aria-label="add task"
          onClick={handleAdd}
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
          startIcon={<AddIcon />}
        >
          Add task
        </Button>
        <IconButton
          aria-label="cancel"
          onClick={onCancel}
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
};

export default NewTask;
