import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    getTodos()
  }, []);

  async function getTodos() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/list`)
    setIsLoading(false)
    setTodos(await res.json())
  }

  async function addTodo(e) {
    e.preventDefault()
    setIsLoading(true)
    await fetch(`${process.env.REACT_APP_API_URL}/add`, { method: 'POST', body: new FormData(e.target) })
    setText('')
    getTodos()
  }

  async function deleteTodo(id) {
    if (!window.confirm('削除しますか？')) {
      return;
    }
    setIsLoading(true)
    await fetch(`${process.env.REACT_APP_API_URL}/delete/${id}`, { method: 'POST' })
    getTodos()
  }

  return (
    <Container maxWidth="sm">
      <Box m={5}>
        <TodoHeader {...{ text, setText, addTodo }} />
        {isLoading ? <>Loading...</> : <TodoList {...{ todos, deleteTodo }} />}
      </Box>
    </Container>
  );
}

export default App;
