"use client";

import React, { useState } from "react";
import { useQuery, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize a new QueryClient instance
const queryClient = new QueryClient();

export default function TodoWrapper({ params: { id } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Todo id={id} />
    </QueryClientProvider>
  );
}

function Todo({ id }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // Fetch the todo details
  const { isLoading, isError, data: todo } = useQuery({
    queryKey: ["todos", id],
    queryFn: async () => {
      const response = await fetch(`https://dummyjson.com/todos/${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  // Mutation for updating the completed status
  const mutation = useMutation({
    mutationFn: async (completed) => {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (!response.ok) throw new Error(`Error updating todo: ${await response.text()}`);
      return response.json();
    },
    onSuccess: () => {
        toast.success("Todo completed status updated successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        setTimeout(() => {
          router.push("/"); // Redirect after toast
        }, 3500); // Delay the toast and redirect by 3 seconds
      },
    onError: (error) => {
      toast.error(`Error updating todo: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  // Form submission handler
  const handleSubmit = (completed) => {
    mutation.mutate(completed);
  };

  if (isLoading) return <div className="text-center text-xl text-black">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center text-xl">Error fetching todo</div>;

  return (
    <div className="p-6 container py-24">
      <ToastContainer /> {/* Add ToastContainer here */}
      <h1 className="text-2xl font-bold mb-4">Todo Details</h1>
      <div className="bg-white shadow-lg rounded p-4 my-5">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-semibold">{todo.todo}</h2>
          <p className={`mt-2 text-2xl ${todo.completed ? "text-emerald-400" : "text-red-600"}`}>
            {todo.completed ? "Completed" : "Not completed"}
          </p>
        </div>
        <div className="flex flex-row justify-between px-12">
          <p className="text-xl text-gray-400">User Id: {todo.userId}</p>
          <p className="text-xl text-gray-400">Id: {todo.id}</p>
        </div>
      </div>

      {isEditing ? (
        <>
          <div className="flex flex-wrap justify-between">
            <button
              className={`${todo.completed === true
                ? "bg-gray-500 text-gray-100 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
                } font-bold py-2 px-4 rounded shadow-md`}
              onClick={() => handleSubmit(true)}
              disabled={todo.completed} // Disable if already completed
            >
              Completed
            </button>
            <button
              className={`${todo.completed === false
                ? "bg-gray-500 text-gray-100 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
                } font-bold py-2 px-4 rounded shadow-md`}
              onClick={() => handleSubmit(false)}
              disabled={!todo.completed} // Disable if not completed
            >
              Not Completed
            </button>
          </div>
          <button
            className="bg-gray-500 hover:bg-gray-600 mt-8 text-white font-bold py-2 px-4 rounded shadow-md"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded shadow-md"
          onClick={() => setIsEditing(true)}
        >
          Edit To Do
        </button>
      )}
    </div>
  );
}
