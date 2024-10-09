// src/app/components/todolist/page.jsx
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTodo } from '../../app/context/TodoContext';

// TodoList Component
const TodoList = () => {
    const { setLastId } = useTodo(); // Use the context to get setLastId

    // Fetching todos from the API
    const { isLoading, isError, data } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await fetch('https://dummyjson.com/todos'); // Using the DummyJSON API
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });

    // Effect to set the lastId based on the fetched data
    useEffect(() => {
        if (data && data.todos) {
            const maxId = Math.max(...data.todos.map(todo => todo.id), 0); // Get the max ID or 0 if empty
            setLastId(maxId); // Update the lastId in context
        }
    }, [data, setLastId]);

    // Handling loading state
    if (isLoading) {
        return <div className="text-center text-xl text-black">Loading...</div>;
    }

    // Handling error state
    if (isError) {
        return <div className="text-red-500 text-center text-xl">Error fetching todos</div>;
    }

    return (
        <div className="max-w-md mx-auto p-4 py-8 container">
            <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
            <ul className="space-y-2">
                {data.todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={`p-4 border rounded shadow ${todo.completed ? 'bg-emerald-300 border-green-500' : 'bg-red-100 border-red-500'}`}
                    >
                        <span className="font-semibold text-black">{todo.todo}</span>
                        <span className={`ml-2 text-sm text-wh ${todo.completed ? 'bg-white-600' : 'text-red-600'}`}>
                            {todo.completed ? 'Completed' : 'Not Completed'}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
