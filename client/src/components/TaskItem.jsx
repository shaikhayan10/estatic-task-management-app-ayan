import { CheckCircle, Circle, Trash2, Edit, Clock } from 'lucide-react';

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
    return (
        <div className={`card p-5 mb-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-l-4 group ${task.completed ? 'border-green-500 bg-gray-50/80' : 'border-indigo-500 bg-white'
            }`}>
            <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${task.completed
                                ? 'bg-green-100 text-green-700'
                                : 'bg-indigo-100 text-indigo-700'
                            }`}>
                            {task.completed ? 'Completed' : 'Pending'}
                        </span>
                        {!task.completed && (
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={12} />
                                Active
                            </span>
                        )}
                    </div>
                    <h4 className={`text-lg font-bold mb-1 transition-colors ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                        }`}>
                        {task.title}
                    </h4>
                    <p className={`text-sm leading-relaxed ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'
                        }`}>
                        {task.description}
                    </p>
                </div>

                <div className="flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => onToggleComplete(task.id, !task.completed)}
                        className={`p-2 rounded-lg transition-all duration-200 ${task.completed
                                ? 'text-green-600 bg-green-50 hover:bg-green-100'
                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            }`}
                        title={task.completed ? "Mark as Incomplete" : "Mark as Completed"}
                    >
                        {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                    </button>
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Task"
                    >
                        <Edit size={20} />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                        title="Delete Task"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
