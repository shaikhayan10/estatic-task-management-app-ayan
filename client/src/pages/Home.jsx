import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { LogOut, LayoutDashboard, AlertCircle } from 'lucide-react';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check auth
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate]);

    const fetchTasks = async () => {
        try {
            setError(null);
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Failed to load tasks. Please check if the server is running.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = async (taskData) => {
        try {
            setError(null);
            const response = await axios.post('/api/tasks', taskData);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
            setError('Failed to add task. Please try again.');
        }
    };

    const handleUpdateTask = async (id, updates) => {
        try {
            setError(null);
            const response = await axios.put(`/api/tasks/${id}`, updates);
            setTasks(tasks.map(t => (t.id === id ? response.data : t)));
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
            setError('Failed to update task. Please try again.');
        }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            setError(null);
            await axios.delete(`/api/tasks/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task. Please try again.');
        }
    };

    const handleToggleComplete = async (id, completed) => {
        try {
            setError(null);
            const response = await axios.put(`/api/tasks/${id}`, { completed });
            setTasks(tasks.map(t => (t.id === id ? response.data : t)));
        } catch (error) {
            console.error('Error toggling completion:', error);
            setError('Failed to update task status. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    return (
        <div className="min-h-screen pb-12">
            <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-white/20">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-indigo-600">
                        <LayoutDashboard size={24} />
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            Task Manager
                        </h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-red-50"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg flex items-center gap-3 text-red-700 animate-fade-in">
                        <AlertCircle size={24} />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="card p-6 mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none">
                                <h2 className="text-2xl font-bold mb-2">Hello there! 👋</h2>
                                <p className="text-indigo-100">
                                    Manage your tasks efficiently and stay organized.
                                </p>
                            </div>
                            <TaskForm
                                onAddTask={handleAddTask}
                                onUpdateTask={handleUpdateTask}
                                editingTask={editingTask}
                                onCancelEdit={() => setEditingTask(null)}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
                            <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                                {tasks.length} Tasks
                            </span>
                        </div>
                        <TaskList
                            tasks={tasks}
                            onToggleComplete={handleToggleComplete}
                            onDelete={handleDeleteTask}
                            onEdit={setEditingTask}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
