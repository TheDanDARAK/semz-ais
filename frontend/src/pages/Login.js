import React, { useState } from 'react'
import axios from '../axiosSetup'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const r = await axios.post('/auth/login', { email, password })
      login(r.data.token, r.data.role)
      nav('/')
    } catch (x) {
      setMsg('Ошибка входа')
    }
  }
  return (
    <div style={{ padding: 20 }}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={x => setEmail(x.target.value)} />
        </div>
        <div>
          <label>Пароль</label><br/>
          <input type='password' value={password} onChange={x => setPassword(x.target.value)} />
        </div>
        <button type='submit'>Войти</button>
      </form>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}
    </div>
  )
}
export default Login

