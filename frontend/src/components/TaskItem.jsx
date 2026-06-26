import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-150 ${
      task.is_completed
        ? "bg-slate-50 border-slate-100"
        : "bg-white border-slate-200 hover:border-blue-200 hover:shadow-sm"
    }`}>

      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
          task.is_completed
            ? "bg-emerald-500 border-emerald-500 text-white"
            : "border-slate-300 hover:border-blue-400"
        }`}
      >
        {task.is_completed && (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${
          task.is_completed ? "line-through text-slate-400" : "text-slate-800"
        }`}>
          {task.title}
        </p>
        {task.description && (
          <p className={`text-xs mt-0.5 ${
            task.is_completed ? "text-slate-300" : "text-slate-500"
          }`}>
            {task.description}
          </p>
        )}
        <p className="text-xs text-slate-300 mt-1">
          {new Date(task.created_at).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric"
          })}
        </p>
      </div>

      {/* Status badge */}
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
        task.is_completed
          ? "bg-emerald-50 text-emerald-600"
          : "bg-blue-50 text-blue-600"
      }`}>
        {task.is_completed ? "Done" : "Active"}
      </span>

      {/* Actions */}
      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 rounded-md text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
          title="Edit task"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
          </svg>
        </button>

        {confirmDelete ? (
          <div className="flex gap-1">
            <button
              onClick={() => onDelete(task.id)}
              className="text-xs px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Delete task"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 011-1h4a1 1 0 011 1m-7 0h8" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}