import React from 'react';
import { useTodo } from '../../Contexts/ToDoContext/TodoContext';
import './TodoList.css';

const TodoList = () => {
    const { todos, toggleTodo, deleteTodo } = useTodo();

    return (
        <div className="todo-list">
            {todos.map((todo, index) => (
                <div key={index} className="todo-item">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => { toggleTodo(index); }}
                        className="todo-checkbox"
                    />
                    <label className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                        {todo.text}
                    </label>
                    {todo.completed && todo.completedAt && (
                        <>
                            <span className="todo-completed-at">
                                Completed At: {new Date(todo.completedAt).toLocaleString()}
                            </span>
                            <button
                                className="delete-button"
                                onClick={() => deleteTodo(index)}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TodoList;
