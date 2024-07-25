import React, { createContext, useEffect, useState, useContext } from "react";

const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        const localtodos = localStorage.getItem("todos");
        return localtodos ? JSON.parse(localtodos) : [];
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        const newTodo = { text, completed: false };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (index) => {
        const newTodos = todos.map((todo, i) => {
            if (i === index) {
                return {
                    ...todo,
                    completed: !todo.completed,
                    completedAt: !todo.completed ? new Date().toISOString() : null,
                };
            }
            return todo;
        });

        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <ToDoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
            {children}
        </ToDoContext.Provider>
    );
};

export const useTodo = () => {
    const context = useContext(ToDoContext);
    if (!context) {
        throw new Error("useTodo must be used within a ToDoProvider");
    }
    return context;
};

export default ToDoContext;
