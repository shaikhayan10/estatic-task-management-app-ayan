import { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';

const TaskForm = ({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting task form:', { title, description, editingTask });
        if (!title.trim()) {
            console.warn('Task submission cancelled: Title is empty');
            return;
        }

        if (editingTask) {
            onUpdateTask(editingTask.id, { title, description });
        } else {
            console.log('Calling onAddTask with:', { title, description });
            onAddTask({ title, description });
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-6 mb-6 animate-fade-in-up">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                {editingTask ? (
                    <>
                        <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                        Edit Task
                    </>
                ) : (
                    <>
                        <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                        Add New Task
                    </>
                )}
            </h3>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    className="input-field"
                    id="title"
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="input-field resize-none"
                    id="description"
                    placeholder="Add some details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                />
            </div>
            <div className="flex items-center gap-3">
                <button
                    className={`flex-1 flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ${editingTask
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                        }`}
                    type="submit"
                >
                    {editingTask ? <Save size={18} /> : <Plus size={18} />}
                    {editingTask ? 'Update Task' : 'Add Task'}
                </button>
                {editingTask && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                    >
                        <X size={18} /> Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
