// TodoForm.js
import React from "react";

export default function TodoForm({
  onSubmit,
  errors,
  register,
}) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md">
      {/* Todo Input Field */}
      <div className="mb-4">
        <label
          htmlFor="todo"
          className="block text-sm font-medium text-gray-700"
        >
          To Do
        </label>
        <input
          type="text"
          id="todo"
          {...register("todo", {
            required: "This field is required",
            validate: (value) =>
              typeof value === "string" || "Must be a string",
          })}
          className={`mt-1 block w-full p-2 border ${
            errors.todo ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        {errors.todo && (
          <p className="text-red-500 text-xs">{errors.todo.message}</p>
        )}
      </div>

      {/* User ID Input Field */}
      <div className="mb-4">
        <label
          htmlFor="userId"
          className="block text-sm font-medium text-gray-700"
        >
          User ID
        </label>
        <input
          type="number"
          id="userId"
          {...register("userId", {
            required: "This field is required",
          })}
          className={`mt-1 block w-full p-2 border ${
            errors.userId ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        {errors.userId && (
          <p className="text-red-500 text-xs">{errors.userId.message}</p>
        )}
      </div>

      {/* Completed Checkbox Field */}
      <div className="mb-4">
        <label
          htmlFor="completed"
          className="block text-sm font-medium text-gray-700"
        >
          Completed
        </label>
        <input type="checkbox" id="completed" {...register("completed")} />
        {errors.completed && (
          <p className="text-red-500 text-xs">{errors.completed.message}</p>
        )}
      </div>
      <div className="flex flex-wrap justify-between">
        <button
          type="submit"
          className="w-[200Px] bg-emerald-600 text-white font-bold py-2 px-4 rounded hover:bg-emerald-700 transition duration-200"
        >
          Create To do
        </button>
      </div>
      {/* Submit Button */}
    </form>
  );
}
