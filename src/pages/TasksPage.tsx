import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Container } from "@mui/material";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import ColumnsContainer from "../components/ColumnsContainer";
import Column from "../components/Columns";
import { moveTask } from "../redux/tasksSlice";

const TasksPage = () => {
  const { tasks, columns, columnOrder } = useSelector(
    (state: RootState) => state.tasks
  );
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    dispatch(
      moveTask({
        draggableId,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container
        maxWidth="xl"
        sx={{
          overflowY: "auto",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <ColumnsContainer>
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);
            return (
              <Column
                key={column.id}
                id={column.id}
                title={column.id}
                tasks={columnTasks}
              />
            );
          })}
        </ColumnsContainer>
      </Container>
    </DragDropContext>
  );
};

export default TasksPage;
