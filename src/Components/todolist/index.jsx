import React, { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useTodo } from "../../app/context/TodoContext";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// TodoList Component
const TodoList = () => {
  const router = useRouter();
  const { setLastId } = useTodo(); // Use the context to get setLastId

  // Fetching todos from the API
  const { isLoading, isError, data } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("https://dummyjson.com/todos"); // Using the DummyJSON API
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  // Effect to set the lastId based on the fetched data
  useEffect(() => {
    if (data && data.todos) {
      const maxId = Math.max(...data.todos.map((todo) => todo.id), 0); // Get the max ID or 0 if empty
      setLastId(maxId); // Update the lastId in context
    }
  }, [data, setLastId]);

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Error deleting todo: ${await response.text()}`);
      return response.json();
    },
    onSuccess: (response) => {
      toast.success(`Todo Deleted successfully! IsDeleted: ${response.isDeleted}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      toast.error(`Error deleting todo: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  // Form submission handler
  const handleSubmit = (id) => {
    mutation.mutate(id);
  };

  // Handling loading state
  if (isLoading) {
    return <div className="text-center text-xl text-black">Loading...</div>;
  }

  // Handling error state
  if (isError) {
    return (
      <div className="text-red-500 text-center text-xl">
        Error fetching todos
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 py-24 container">
      <ToastContainer /> 
      <ul className="space-y-2">
        {data.todos.map((todo) => (
          <Link href={`/Todo/${todo.id}`} key={todo.id}>
            <li
              className={`p-4 my-4 border rounded shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer`}
            >
              <div className="flex flex-row justify-between items-center">
                <span
                  className={`font-semibold text-black ${
                    todo.completed ? "text-emerald-700" : "text-red-500"
                  }`}
                >
                  {todo.todo}
                </span>
                <div className="flex flex-wrap justify-end float-end w-full">
                  <span
                    className={` ml-2 text-sm ${
                      todo.completed ? "text-green-600" : "text-red-600"
                    } flex items-center px-5`}
                  >
                    {todo.completed ? (
                      <>
                        {`Completed `}
                        <FaCheckCircle
                          size={22}
                          style={{ color: "green" }}
                          className="ml-1 text-xl "
                        />
                      </>
                    ) : (
                      <>
                        {"Not Completed "}
                        <FaTimes
                          size={22}
                          style={{ color: "red" }}
                          className="ml-1 text-xl "
                        />
                      </>
                    )}
                  </span>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md z-40"
                    onClick={(e) =>{ e.preventDefault(); handleSubmit(todo.id)}}
                  >
                    Delete To Do
                  </button>
                </div>
                <div>
                  
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
