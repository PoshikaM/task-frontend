'use client';

import { useState, useEffect } from 'react';
import { Plus, Check, Trash2, X, CheckCircle2, Circle } from 'lucide-react';

export default function Home() {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://task-backend-gfbf.onrender.com';

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/tasks`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTask() {
    if (!title.trim()) return alert('Please enter task title');

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      alert(err.message);
    }
  }

  async function toggleStatus(id) {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to update task');
      fetchTasks();
    } catch (err) {
      alert(err.message);
    }
  }

  async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
      fetchTasks();
    } catch (err) {
      alert(err.message);
    }
  }

  const filteredTasks = tasks?.filter(task => {
    if (filter === 'active') return !task.status;
    if (filter === 'completed') return task.status;
    return true;
  });

  const stats = {
    total: tasks?.length || 0,
    active: tasks?.filter(t => !t.status).length || 0,
    completed: tasks?.filter(t => t.status).length || 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">Organize your day, accomplish your goals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Tasks</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-2xl font-bold text-cyan-600">{stats.active}</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-2xl font-bold text-emerald-600">{stats.completed}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
        </div>

        {/* Add Task Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-teal-600" />
            Add New Task
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600
                transition text-gray-900 placeholder-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && addTask()}
            />
            <textarea
              placeholder="Add details (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600
                transition resize-none text-gray-900 placeholder-gray-400"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              onClick={addTask}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border border-gray-100 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-3 font-medium transition ${
                filter === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`flex-1 py-3 font-medium transition border-x border-gray-100 ${
                filter === 'active'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex-1 py-3 font-medium transition ${
                filter === 'completed'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks && filteredTasks.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <div className="text-gray-400 mb-2">
                <Circle className="w-16 h-16 mx-auto mb-4" />
              </div>
              <p className="text-gray-500 text-lg">No tasks found</p>
              <p className="text-gray-400 text-sm">Add a task to get started!</p>
            </div>
          )}

          {filteredTasks?.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 p-5 border border-gray-100 ${
                task.status ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleStatus(task.id)}
                  className={`flex-shrink-0 mt-1 transition ${
                    task.status ? 'text-emerald-500' : 'text-gray-300 hover:text-teal-500'
                  }`}
                >
                  {task.status ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-lg mb-1 ${
                      task.status
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p
                      className={`text-sm ${
                        task.status ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStatus(task.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      task.status
                        ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    {task.status ? 'Undo' : 'Done'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}