import React, { useState } from 'react';
import { useTodo } from '../../Contexts/ToDoContext/TodoContext';
import './AddTodo.css';

const AddTodo = () => {
    const [text, setText] = useState('');
    const { addTodo } = useTodo();

    const submitHandler = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text);
        setText('');
    };

    return (
        <form onSubmit={submitHandler}>
            <input
                type='text'
                value={text}
                placeholder='Add a new ToDo'
                onChange={(e) => setText(e.target.value)}
            />
            <button type='submit'>Add ToDo</button>
        </form>
    );
};

export default AddTodo;
