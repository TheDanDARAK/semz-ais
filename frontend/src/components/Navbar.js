import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
function Navbar() {
  const { token, role, logout } = useAuth()
  const nav = useNavigate()
  function handleLogout() {
    logout()
    nav('/')
  }
  return (
    <div style={{ background: '#eee', padding: 10, marginBottom: 10 }}>
      <Link to='/' style={{ marginRight: 10 }}>Главная</Link>
      {!token && <Link to='/login' style={{ marginRight: 10 }}>Вход</Link>}
      {!token && <Link to='/register' style={{ marginRight: 10 }}>Регистрация</Link>}
      {token && <Link to='/equipment' style={{ marginRight: 10 }}>Оборудование</Link>}
      {token && <Link to='/parts' style={{ marginRight: 10 }}>Детали</Link>}
      {token && <Link to='/routes' style={{ marginRight: 10 }}>Маршруты</Link>}
      {token && <Link to='/operations' style={{ marginRight: 10 }}>Операции</Link>}
      {token && role === 'admin' && <Link to='/users' style={{ marginRight: 10 }}>Пользователи</Link>}
      {token && <button onClick={handleLogout}>Выйти</button>}
    </div>
  )
}
export default Navbar
