import React, { useEffect, useState } from 'react'
import axios from '../axiosSetup'
function UsersList() {
  const [data, setData] = useState([])
  const [err, setErr] = useState('')
  async function load() {
    try {
      const r = await axios.get('/users')
      setData(r.data)
    } catch (x) {
      setErr('Ошибка загрузки')
    }
  }
  async function removeUser(id) {
    try {
      await axios.delete('/users/' + id)
      setData(data.filter(u => u.id !== id))
    } catch (x) {
      setErr('Ошибка удаления')
    }
  }
  useEffect(() => {
    load()
  }, [])
  return (
    <div style={{ padding: 20 }}>
      <h2>Пользователи</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <ul>
        {data.map(u => (
          <li key={u.id}>
            {u.fullName} ({u.email}, {u.role})
            <button onClick={() => removeUser(u.id)} style={{ marginLeft: 10 }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default UsersList
