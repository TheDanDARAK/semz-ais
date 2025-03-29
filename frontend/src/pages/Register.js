import React, { useState } from 'react'
import axios from '../axiosSetup'
import { useNavigate } from 'react-router-dom'
function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const nav = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post('/auth/register', { fullName, email, password })
      setMsg('Регистрация прошла успешно')
      setTimeout(() => {
        nav('/login')
      }, 1500)
    } catch (x) {
      setMsg('Ошибка при регистрации')
    }
  }
  return (
    <div style={{ padding: 20 }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ФИО</label><br/>
          <input value={fullName} onChange={e => setFullName(e.target.value)} />
        </div>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Пароль</label><br/>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type='submit'>Зарегистрироваться</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
export default Register
