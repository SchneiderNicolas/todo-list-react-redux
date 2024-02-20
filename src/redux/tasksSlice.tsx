import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { ITask, Column } from "../models/ITask";

export interface TasksState {
  tasks: Record<string, ITask>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

interface MoveTaskPayload {
  draggableId: string;
  sourceColumnId: string;
  destinationColumnId: string;
  sourceIndex: number;
  destinationIndex: number;
}

const initialState: TasksState = {
  tasks: {},
  columns: {
    Todo: { id: "Todo", taskIds: [] },
    "In progress": { id: "In progress", taskIds: [] },
    Done: { id: "Done", taskIds: [] },
  },
  columnOrder: ["Todo", "In progress", "Done"],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<ITask>) => {
        const task = action.payload;
        state.tasks[task.id] = task;
        state.columns[task.status].taskIds.push(task.id);
      },
      prepare: (
        title: string,
        description: string,
        status: "Todo" | "In progress" | "Done"
      ) => {
        const id = nanoid();
        return { payload: { id, title, description, status } };
      },
    },
    deleteTask: (
      state,
      action: PayloadAction<{
        id: string;
        status: "Todo" | "In progress" | "Done";
      }>
    ) => {
      const { id, status } = action.payload;
      delete state.tasks[id];
      state.columns[status].taskIds = state.columns[status].taskIds.filter(
        (taskId) => taskId !== id
      );
    },
    editTask: (
      state,
      action: PayloadAction<{
        id: string;
        title?: string;
        description?: string;
      }>
    ) => {
      const { id, title, description } = action.payload;
      const task = state.tasks[id];
      if (task) {
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
      }
    },
    moveTask: (state, action: PayloadAction<MoveTaskPayload>) => {
      const {
        draggableId,
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
      } = action.payload;

      if (sourceColumnId === destinationColumnId) {
        const column = state.columns[sourceColumnId];
        const newTaskIds = Array.from(column.taskIds);
        const [reorderedItem] = newTaskIds.splice(sourceIndex, 1);
        newTaskIds.splice(destinationIndex, 0, reorderedItem);
        state.columns[sourceColumnId].taskIds = newTaskIds;
      } else {
        const sourceColumn = state.columns[sourceColumnId];
        const sourceTaskIds = Array.from(sourceColumn.taskIds);
        sourceTaskIds.splice(sourceIndex, 1);
        state.columns[sourceColumnId].taskIds = sourceTaskIds;

        const destinationColumn = state.columns[destinationColumnId];
        const destinationTaskIds = Array.from(destinationColumn.taskIds);
        destinationTaskIds.splice(destinationIndex, 0, draggableId);
        state.columns[destinationColumnId].taskIds = destinationTaskIds;

        const task = state.tasks[draggableId];
        if (task) {
          task.status = destinationColumnId as "Todo" | "In progress" | "Done";
        }
      }
    },
  },
});

export const { addTask, deleteTask, editTask, moveTask } = tasksSlice.actions;

export default tasksSlice.reducer;
