import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, updateTask, toggleTask, deleteTask } from "./api/tasks";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTasks(search, status);
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const delay = setTimeout(fetchTasks, 200);
    return () => clearTimeout(delay);
  }, [fetchTasks]);

  // Counts — fetch all tasks once for accurate counts regardless of current filter
  const [allTasks, setAllTasks] = useState([]);
  useEffect(() => {
    getTasks("", "all").then((res) => setAllTasks(res.data)).catch(() => {});
  }, [tasks]);

  const counts = {
    all: allTasks.length,
    active: allTasks.filter((t) => !t.is_completed).length,
    inactive: allTasks.filter((t) => t.is_completed).length,
  };

  const handleSubmit = async (data) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, data);
      } else {
        await createTask(data);
      }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch {
      setError("Failed to save task.");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleTask(id);
      fetchTasks();
    } catch {
      setError("Failed to update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch {
      setError("Failed to delete task.");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Tasks</h1>
            <p className="text-xs text-slate-400 mt-0.5">Stay on top of what matters</p>
          </div>
          <button
            onClick={() => { setEditingTask(null); setShowForm(true); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            <span className="text-base leading-none">+</span> New task
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex justify-between items-center">
            {error}
            <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 ml-2">✕</button>
          </div>
        )}

        {/* Search */}
        <div className="mb-3">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Filter tabs */}
        <div className="mb-4">
          <FilterTabs active={status} onChange={setStatus} counts={counts} />
        </div>

        {/* Task list */}
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {/* Modal */}
      {showForm && (
        <TaskForm
          key={editingTask?.id || "new-task"} 
          editingTask={editingTask}
          onSubmit={handleSubmit}
          onClose={() => { setShowForm(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
}