import React, { useState, useEffect } from "react";
import ToDoItem from "../ToDoItem";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const Todo = () => {
  // State to manage the current todo item being entered
  const [todoItem, setTodoItem] = useState("");

  // State to manage the list of todo items
  const [todoList, setTodoList] = useState([]);

  // Effect to load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodoList(storedTodos);
    }
  }, []);

  // Handler to update the current todo item being entered
  const onEnterTask = (e) => setTodoItem(e.target.value);

  // Handler to add a new todo item to the list
  const onAddTask = () => {
    if (todoItem.trim() === "") return;

    const newTask = { id: uuidv4(), text: todoItem, completed: false };
    const updatedTodoList = [...todoList, newTask];

    setTodoList(updatedTodoList);
    localStorage.setItem("todos", JSON.stringify(updatedTodoList));

    setTodoItem("");
  };

  // Handler to delete a todo item from the list
  const onDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
    localStorage.setItem("todos", JSON.stringify(updatedTodoList));
  };

  // Handler to edit a todo item in the list
  const onEditTodo = (id, newText) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodoList(updatedTodoList);
    localStorage.setItem("todos", JSON.stringify(updatedTodoList));
  };

  // Handler to toggle the completion status of a todo item
  const onToggleComplete = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(updatedTodoList);
    localStorage.setItem("todos", JSON.stringify(updatedTodoList));
  };

  return (
    <div className='todo-container'>
      {/* Animated heading */}
      <div className='wrapper'>
        <span className='letter letter1'>M</span>
        <span className='letter letter2'>Y</span>
        <span className='letter letter3'>T</span>
        <span className='letter letter4'>O</span>
        <span className='letter letter5'>D</span>
        <span className='letter letter6'>O</span>
        <span className='letter letter7'>S</span>
      </div>

      {/* Input group to add new tasks */}
      <div className='input-group'>
        <input
          placeholder='Enter the task'
          type='text'
          id='input-field'
          onChange={onEnterTask}
          value={todoItem}
        />
        <button className='submit-button' onClick={onAddTask}>
          <span>ADD</span>
        </button>
      </div>

      {/* Conditional rendering to display a message if there are no tasks */}
      {todoList.length === 0 ? (
        <p className='empty-message'>
          No tasks available. Please add some tasks.
        </p>
      ) : (
        // List of todo items
        <ul>
          {todoList.map((eachTodo) => (
            <ToDoItem
              key={eachTodo.id}
              eachTodo={eachTodo}
              onEditTodo={onEditTodo}
              onDeleteTodo={onDeleteTodo}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
