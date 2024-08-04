import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodos'
import { Todos } from './components/Todos'


function App() {
  const [todos, setTodos] = useState([]);

  async function gettodos() {
  const response = await fetch("http://localhost:3000/todo", {
    method: "GET"
  });
  const allTodos = await response.json();
  setTodos(allTodos.Todos);
 } 

 if (todos.length === 0) {
  gettodos(); 
 }
  
  return (
    <div>
      <h1>Enter the title and description of your task:</h1>
      <CreateTodo getTodos={gettodos}></CreateTodo><br />
      <h1>Your Todos:</h1>
      <Todos todos={todos} getTodos={gettodos}></Todos>
    </div>
  )
}



export default App
