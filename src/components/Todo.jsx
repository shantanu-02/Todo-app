import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./TodoList";
import FilterButtons from "./FilterButtons";
import { BsSearch } from "react-icons/bs";
import { addTodo, updateSearchTerm, setTodos } from "../redux/actions";

const Todo = () => {
  // Redux state and dispatch
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // Local state for input values
  const [newTodoText, setNewTodoText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    dispatch(setTodos(storedTodos)); // Dispatch action to set todos
  }, []);

  // Save todos to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to handle adding new todo
  const handleAddTodo = (text) => {
    dispatch(addTodo(text));
  };

  // Handler for clicking add todo button
  const handleAddTodoClick = () => {
    if (newTodoText.trim() !== "") {
      handleAddTodo(newTodoText.trim());
      setNewTodoText("");
    }
  };

  // Handler for search input change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
      {/* Title */}
      <h2 className="mt-3 mb-6 text-2xl font-bold text-center uppercase">
        TODO APP
      </h2>

      {/* Add Todo Input */}
      <div className="flex items-center mb-4">
        <input
          id="addTodoInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add Todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodoClick();
            }
          }}
        />
        <button
          className="ml-4 p-2 bg-purple-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleAddTodoClick}
        >
          Add
        </button>
      </div>

      {/* Filter and Search Input */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="ml-4 p-2 bg-purple-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            <BsSearch size={20} />
          </button>
        </div>
      </div>

      {/* Todo List */}
      <TodoList />
    </div>
  );
};

export default Todo;

