import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import TasksPage from "./pages/TasksPage";
// import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      {/*<Route path="/" element={<Home />} />*/}
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/" element={<Navigate to="/tasks" replace />} />
    </Routes>
  );
}

export default App;
