import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTaskStatus, deleteTask } from './api';
import { Plus, Trash2, CheckCircle, Circle, ClipboardList } from 'lucide-react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await createTask({ title, description, completed: false });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await updateTaskStatus(id, !currentStatus);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <header>
        <ClipboardList size={40} color="#58a6ff" />
        <h1>Modern To-Do List</h1>
        <p>A beautiful way to manage your tasks</p>
      </header>

      <div className="card">
        <form onSubmit={handleAddTask} className="task-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <textarea
              placeholder="Add a description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="2"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <Plus size={20} /> Add Task
              </span>
            )}
          </button>
        </form>
      </div>

      <div className="task-list-container">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Add one above!</p>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <div 
                    className="status-toggle" 
                    onClick={() => handleToggleStatus(task.id, task.completed)}
                  >
                    {task.completed ? (
                      <CheckCircle size={24} color="#238636" fill="#238636" />
                    ) : (
                      <Circle size={24} color="rgba(255,255,255,0.4)" />
                    )}
                  </div>
                  <div className="task-info">
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                  </div>
                </div>
                <div className="actions">
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDeleteTask(task.id)}
                    title="Delete Task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
