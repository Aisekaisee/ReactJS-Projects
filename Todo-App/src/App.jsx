import React, { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = () => {
    if (!todo.trim()) return;

    if (editId) {
      setTodos(
        todos.map((val) => (val.id === editId ? { ...val, text: todo } : val)),
      );
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: todo, completed: false }]);
    }

    setTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((val) =>
        val.id === id ? { ...val, completed: !val.completed } : val,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((val) => val.id !== id));
  };

  const startEdit = (todoItem) => {
    setTodo(todoItem.text);
    setEditId(todoItem.id);
  };

  const cancelEdit = () => {
    setEditId(null);
    setTodo("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">📝 Todo App</h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter your task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAddOrUpdate}
            className={`px-4 py-2 rounded-lg text-white ${
              editId
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {editId && (
          <button
            onClick={cancelEdit}
            className="text-sm text-gray-500 mb-4 hover:underline"
          >
            Cancel edit
          </button>
        )}

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map((val) => (
            <li
              key={val.id}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={val.completed}
                  onChange={() => toggleTodo(val.id)}
                  className="accent-blue-500"
                />
                <span
                  className={`${
                    val.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {val.text}
                </span>
              </label>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(val)}
                  disabled={val.completed}
                  className="text-blue-500 hover:text-blue-700 disabled:text-gray-300"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(val.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No tasks yet ✨</p>
        )}
      </div>
    </div>
  );
}

export default App;
