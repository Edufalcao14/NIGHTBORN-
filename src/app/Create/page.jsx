"use client";
import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { useTodo } from '../context/TodoContext';
// Define a schema for validation  
const schema = yup.object().shape({
    id: yup.number().required('ID is required'),
    todo: yup.string().required('Todo is required').matches(/^[a-zA-Z0-9 ]*$/, 'Only alphanumeric characters are allowed'),
    completed: yup.boolean().required('Completed is required'),
    completed: yup.boolean().required('Completed is required'),
    userId: yup.number().required('UserId is required'),
  });

export default function Create() {
    const { addTodo, lastId } = useTodo();// Hook for redirection
   
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
    
            // If successful, show success message and handle navigation
            const result = await response.json();
            console.log('Todo created:', result);
            alert('Todo created successfully!');
            // Handle navigation after successful creation
            // Replace Navigate('/'); with the actual navigation method you are using
             window.location.href = '/';
            
        } catch (error) {
            console.error('Create todo error:', error);
            alert('Error creating todo: ' + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 container pt-[100px]">
            <h2 className="text-2xl font-bold mb-4">Create Todo</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
                
                {/* Todo Input Field */}
                <div className="mb-4">
                    <label htmlFor="todo" className="block text-sm font-medium text-gray-700">
                        To Do
                    </label>
                    <input
                        type="text"
                        id="todo"
                        {...register('todo', { 
                            required: 'This field is required', 
                            validate: value => typeof value === 'string' || 'Must be a string',
                        })}
                        className={`mt-1 block w-full p-2 border ${errors.todo ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.todo && <p className="text-red-500 text-xs">{errors.todo.message}</p>}
                </div>

                {/* User ID Input Field */}
                <div className="mb-4">
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                        User ID
                    </label>
                    <input
                        type="number"
                        id="userId"
                        {...register('userId',{
                            required: 'this field is required',
                        })}
                        className={`mt-1 block w-full p-2 border ${errors.userId ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.userId && <p className="text-red-500 text-xs">{errors.userId.message}</p>}
                </div>

                {/* Completed Checkbox Field */}
                <div className="mb-4">
                    <label htmlFor="completed" className="block text-sm font-medium text-gray-700">
                        Completed
                    </label>
                    <input
                        type="checkbox"
                        id="completed"
                        {...register('completed')}
                    />
                    {errors.completed && <p className="text-red-500 text-xs">{errors.completed.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                    Create Todo
                </button>
            </form>
        </div>
    );
}