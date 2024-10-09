// Create.js
'use client'; // For Next.js or any client-side specific directive

import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTodo } from '../context/TodoContext';
import TodoForm from '../../Components/ToDoForm';

// Define a schema for validation  
const schema = yup.object().shape({
    id: yup.number().required('ID is required'),
    todo: yup.string().required('Todo is required').matches(/^[a-zA-Z0-9 ]*$/, 'Only alphanumeric characters are allowed'),
    completed: yup.boolean().required('Completed is required'),
    userId: yup.number().required('UserId is required'),
});

export default function Create() {
    const { lastId } = useTodo(); // Hook for Todo management
   
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Function that will be called when submitting the form
    const onSubmit = async (data) => {
        const todoData = {
            ...data,
            id: lastId + 1,
        };
    
        try {
            // Validate schema
            await schema.validate(todoData);
    
            // Send POST request
            const response = await fetch('https://dummyjson.com/todos/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoData),
            });
    
            // Check response status
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Error creating todo: ' + JSON.stringify(errorData));
            }
    
            // If successful, show success message
            const result = await response.json();
            console.log('Todo created:', result);
            alert('Todo created successfully!');
            window.location.href = '/'; // Redirect after successful creation
            
        } catch (error) {
            console.error('Create todo error:', error);
            alert('Error creating todo: ' + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 container pt-[100px]">
            <h2 className="text-2xl font-bold mb-4">Create Todo</h2>
            <TodoForm onSubmit={handleSubmit(onSubmit)} errors={errors} register={register} />
        </div>
    );
}
