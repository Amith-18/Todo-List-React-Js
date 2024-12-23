
import { useState, useRef, useEffect } from 'react';
import './Todo.css';
import { TodoItem } from './TodoItem'; // Ensure this import statement is correct
import './TodoItem.css';

let count = 0;
export const Todo = () => {
    const [ todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const add = () => {
        setTodos([...todos, { no: count++, text: inputRef.current.value, display: "" }]);
        inputRef.current.value = "";
        localStorage.setItem('todos_count',count);
    }

    useEffect(()=>{
        setTodos(JSON.parse(localStorage.getItem("todos")))
        count = localStorage.getItem('todos_count')
    },[])

    // Save todos to localStorage whenever they change
    useEffect(() => {
        setTimeout(() => {
            console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos))
        }, 100);
    }, [todos]);

  
    return (
        <div className='todo'>
            <div className="todo-header">To-Do List</div>
            <div className="todo-add">
                <input ref={inputRef} type="text" className='todo-input' placeholder='Add Your Task' />
                <div onClick={add} className="todo-add-btn">Add</div>
            </div>

            <div className="todo-list">
                {todos.map((item, index) => (
                    <TodoItem 
                    key={index} 
                    setTodos={setTodos} 
                    no={item.no} 
                    display={item.display} 
                    text={item.text} />
                ))}
            </div>
        </div>
    );
}


