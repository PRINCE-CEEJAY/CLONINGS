import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Search,
  Filter,
  ListChecks,
  Save,
  RefreshCcw,
} from "lucide-react";

/**
 * React Todo App – Full CRUD in one file
 * - Create: add tasks
 * - Read: list + search + filters
 * - Update: edit title, toggle complete, bulk complete/clear
 * - Delete: single + bulk delete
 * - Persistence: localStorage (swap to real API by replacing data layer)
 *
 * Drop this component into any React app. Tailwind classes included.
 */

// ---- Types -------------------------------------------------
/** @typedef {{ id:string; title:string; done:boolean; createdAt:number }} Todo */

// ---- Data Layer (Local) -----------------------------------
// You can replace these with real API calls later.
const STORAGE_KEY = "todo-crud-ceejay";

/** @returns {Todo[]} */
function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** @param {Todo[]} data */
function writeToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ---- UI Helpers -------------------------------------------
function cls(...a) {
  return a.filter(Boolean).join(" ");
}

function useLocalTodos() {
  const [todos, setTodos] = useState(() => readFromStorage());
  useEffect(() => writeToStorage(todos), [todos]);
  return { todos, setTodos };
}

// ---- Component --------------------------------------------
export default function RealTodo() {
  const { todos, setTodos } = useLocalTodos();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(
    /** @type{"all"|"open"|"done"} */ ("all")
  );
  const [draft, setDraft] = useState("");
  const inputRef = useRef(null);

  // Editing state per-item
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Derived
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return todos.filter((t) => {
      const okQuery = q ? t.title.toLowerCase().includes(q) : true;
      const okFilter =
        filter === "all" ? true : filter === "open" ? !t.done : t.done;
      return okQuery && okFilter;
    });
  }, [todos, query, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.done).length;
    return { total, done, open: total - done };
  }, [todos]);

  // CRUD actions
  function createTodo(title) {
    const text = title.trim();
    if (!text) return;
    const newTodo = {
      id: crypto.randomUUID(),
      title: text,
      done: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    setDraft("");
    inputRef.current?.focus();
  }

  function toggleDone(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setEditText(todo.title);
  }

  function saveEdit(id) {
    const text = editText.trim();
    if (!text) return cancelEdit();
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: text } : t))
    );
    cancelEdit();
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  function removeOne(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearDone() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  function markAllDone() {
    setTodos((prev) => prev.map((t) => ({ ...t, done: true })));
  }

  function resetAll() {
    setTodos([]);
    setDraft("");
    setQuery("");
    setFilter("all");
    cancelEdit();
  }

  // Keyboard handlers
  function onDraftKey(e) {
    if (e.key === "Enter") createTodo(draft);
  }

  function onEditKey(e, id) {
    if (e.key === "Enter") saveEdit(id);
    if (e.key === "Escape") cancelEdit();
  }

  // ---- Render ---------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-2 mb-6">
          <ListChecks className="w-7 h-7" />
          <h1 className="text-2xl sm:text-3xl font-bold">
            Todo App – Full CRUD
          </h1>
        </header>

        {/* Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {/* New item */}
          <div className="flex items-center bg-white rounded-2xl shadow px-3 py-2">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onDraftKey}
              placeholder="Add a new task…"
              className="flex-1 outline-none bg-transparent py-2"
            />
            <button
              onClick={() => createTodo(draft)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:opacity-90"
              aria-label="Add todo"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center bg-white rounded-2xl shadow px-3 py-2">
            <Search className="w-4 h-4 opacity-70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="flex-1 outline-none bg-transparent py-2 ml-2"
              aria-label="Search todos"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center bg-white rounded-2xl shadow px-3 py-2">
            <Filter className="w-4 h-4 opacity-70" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 outline-none bg-transparent py-2 ml-2"
              aria-label="Filter"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="done">Completed</option>
            </select>
          </div>
        </div>

        {/* Bulk actions & Stats */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={markAllDone}
              className="px-3 py-1.5 rounded-xl bg-white shadow hover:bg-slate-100 inline-flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Mark all done
            </button>
            <button
              onClick={clearDone}
              className="px-3 py-1.5 rounded-xl bg-white shadow hover:bg-slate-100 inline-flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Clear completed
            </button>
            <button
              onClick={resetAll}
              className="px-3 py-1.5 rounded-xl bg-white shadow hover:bg-slate-100 inline-flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> Reset
            </button>
          </div>
          <div className="text-sm text-slate-600">
            <span className="mr-3">
              Total: <b>{stats.total}</b>
            </span>
            <span className="mr-3">
              Open: <b>{stats.open}</b>
            </span>
            <span>
              Done: <b>{stats.done}</b>
            </span>
          </div>
        </div>

        {/* List */}
        <ul className="space-y-2">
          {filtered.length === 0 && (
            <li className="text-center text-slate-500 py-10 bg-white rounded-2xl shadow">
              No todos match.
            </li>
          )}
          {filtered.map((t) => (
            <li key={t.id} className="bg-white rounded-2xl shadow p-3">
              <div className="flex items-center gap-3">
                {/* Toggle */}
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleDone(t.id)}
                  className="w-5 h-5 accent-slate-900"
                  aria-label={t.done ? "Mark as open" : "Mark as done"}
                />

                {/* Title / Edit */}
                {editingId === t.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => onEditKey(e, t.id)}
                    autoFocus
                    className="flex-1 outline-none border rounded-xl px-2 py-1"
                    aria-label="Edit todo"
                  />
                ) : (
                  <span
                    className={cls(
                      "flex-1",
                      t.done && "line-through text-slate-400"
                    )}
                  >
                    {t.title}
                  </span>
                )}

                {/* Actions */}
                {editingId === t.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(t.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:opacity-90 inline-flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 inline-flex items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(t)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 inline-flex items-center gap-2"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => removeOne(t.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 inline-flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <p className="text-xs text-slate-500 mt-6 text-center">
          Data persists in localStorage. Replace data layer with real API when
          ready.
        </p>

        {/* How to swap to real API (quick guide) */}
        <details className="mt-4 bg-white rounded-2xl shadow p-4">
          <summary className="cursor-pointer font-semibold">
            Swap to a real REST API
          </summary>
          <div className="prose max-w-none mt-3">
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                Make an API module with <code>listTodos</code>,{" "}
                <code>createTodo</code>, <code>updateTodo</code>,{" "}
                <code>deleteTodo</code>.
              </li>
              <li>
                Replace the localStorage calls with{" "}
                <code>await fetch(...)</code> to your backend.
              </li>
              <li>
                On success, update state with the server payload to stay in
                sync.
              </li>
            </ol>
          </div>
        </details>
      </div>
    </div>
  );
}
