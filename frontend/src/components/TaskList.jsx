import TaskItem from "./TaskItem";

export default function TaskList({ tasks, loading, onToggle, onDelete, onEdit }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 rounded-lg bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl mb-2">📋</p>
        <p className="text-sm font-medium text-slate-500">No tasks found</p>
        <p className="text-xs text-slate-400 mt-1">Add a task or try a different filter</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}