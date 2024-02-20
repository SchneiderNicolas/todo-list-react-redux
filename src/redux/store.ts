import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";
import tasksReducer from "./tasksSlice";
import { loadState, saveState } from "../utils/localStorageUtils";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    tasks: tasksReducer,
  },
  preloadedState: persistedState ? { tasks: persistedState } : undefined,
});

store.subscribe(() => {
  saveState(store.getState().tasks);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;