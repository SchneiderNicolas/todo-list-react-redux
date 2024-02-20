import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { Droppable, Draggable } from "@hello-pangea/dnd";

import { addTask } from "../redux/tasksSlice";
import Task from "./Task";
import { ITask } from "../models/ITask";
import NewTask from "./NewTask";

interface ColumnProps {
  id: string;
  title: string;
  tasks: ITask[];
}

const Column = ({ id, title, tasks }: ColumnProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const handleAddNewTask = (newTitle: string, description: string) => {
    dispatch(
      addTask(newTitle, description, title as "Todo" | "In progress" | "Done")
    );
    setIsAdding(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 300px",
        minWidth: "380px",
        backgroundColor: "#141416",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        color: "white",
        maxHeight: "100vh",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#1E1E1E",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#565656",
          borderRadius: "2px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "left", color: "#858B97" }}>
          {title}
        </Typography>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            sx={{
              color: "#FF7051",
              "&:hover": {
                backgroundColor: "rgba(255, 112, 81, 0.2)",
              },
            }}
            startIcon={<AddIcon />}
          >
            Add Task
          </Button>
        )}
      </Box>
      {isAdding && (
        <NewTask onAdd={handleAddNewTask} onCancel={() => setIsAdding(false)} />
      )}

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flexGrow: 1,
              minHeight: "100px",
            }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{ marginBottom: "8px" }}
                  >
                    <Task task={task} />
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default Column;
