'use client'
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoList from '../Components/todolist';

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <TodoList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
