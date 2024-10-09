'use client';
// src/app/context/TodoContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the Todo context
const TodoContext = createContext();

// Provider component
export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]); // Initialize the todos array
    const [lastId, setLastId] = useState(0); // Initialize the last ID

    // Function to add a todo
    const addTodo = (todo) => {
        setTodos([...todos, todo]);
        setLastId((prevId) => Math.max(prevId, todo.id)); // Ensure lastId is updated correctly
    };

    return (
        <TodoContext.Provider value={{ todos, lastId, addTodo, setLastId }}>
            {children}
        </TodoContext.Provider>
    );
};

// Custom hook to use the Todo context
export const useTodo = () => {
    return useContext(TodoContext);
};
