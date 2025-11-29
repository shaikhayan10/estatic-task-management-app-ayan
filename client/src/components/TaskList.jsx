import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

const TaskList = ({ tasks, onToggleComplete, onDelete, onEdit }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-indigo-100 bg-white/50">
                <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400">
                    <ClipboardList size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No tasks yet</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    Get started by adding a new task above. Stay organized and productive!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default TaskList;
