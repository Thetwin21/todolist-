import React from 'react'

const Todo = ({todo, toggleTodo}) => {
  const handleTodoClick = () => {
    toggleTodo(todo.id)
  }
  return (
    <div className='todo'><input type="checkbox" onChange={handleTodoClick} checked={todo.complete} />{todo.name}</div>
  )
}

export default Todo