export interface ITask {
  id: string;
  title: string;
  description: string;
  status: "Todo" | "In progress" | "Done";
}

export interface Column {
  id: string;
  taskIds: string[];
}
