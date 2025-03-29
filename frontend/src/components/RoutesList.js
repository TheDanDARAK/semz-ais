import React, { useEffect, useState } from 'react'
import axios from '../axiosSetup'
function RoutesList() {
  const [routes, setRoutes] = useState([])
  const [err, setErr] = useState('')
  const [partId, setPartId] = useState('')
  const [name, setName] = useState('')
  async function load() {
    try {
      const r = await axios.get('/routes')
      setRoutes(r.data)
    } catch (x) {
      setErr('Ошибка загрузки')
    }
  }
  async function add(e) {
    e.preventDefault()
    try {
      const resp = await axios.post('/routes', { partId, name })
      setRoutes([...routes, resp.data])
      setPartId('')
      setName('')
    } catch (x) {
      setErr('Ошибка добавления')
    }
  }
  useEffect(() => {
    load()
  }, [])
  return (
    <div style={{ padding: 20 }}>
      <h2>Маршруты</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <ul>
        {routes.map(rt => (
          <li key={rt.id}>
            ID {rt.id} / Part {rt.partId} / {rt.name}
          </li>
        ))}
      </ul>
      <form onSubmit={add}>
        <input placeholder='partId' value={partId} onChange={x => setPartId(x.target.value)} />
        <input placeholder='Название' value={name} onChange={x => setName(x.target.value)} />
        <button>Добавить</button>
      </form>
    </div>
  )
}
export default RoutesList
