import { useState, useEffect } from 'react'
import axios from '../axiosSetup'
function useAuth() {
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')
  useEffect(() => {
    const t = localStorage.getItem('token')
    const r = localStorage.getItem('role')
    if (t) {
      setToken(t)
      setRole(r || '')
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + t
    }
  }, [])
  function login(tok, rol) {
    localStorage.setItem('token', tok)
    localStorage.setItem('role', rol)
    setToken(tok)
    setRole(rol)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tok
  }
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setToken('')
    setRole('')
    delete axios.defaults.headers.common['Authorization']
  }
  return { token, role, login, logout }
}
export default useAuth
