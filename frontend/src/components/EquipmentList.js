import React, { useEffect, useState } from 'react'
import axios from '../axiosSetup'
function EquipmentList() {
  const [data, setData] = useState([])
  const [err, setErr] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  async function load() {
    try {
      const r = await axios.get('/equipment')
      setData(r.data)
    } catch (x) {
      setErr('Ошибка загрузки')
    }
  }
  async function add(e) {
    e.preventDefault()
    try {
      const r = await axios.post('/equipment', { name, type, status })
      setData([...data, r.data])
      setName('')
      setType('')
      setStatus('')
    } catch (x) {
      setErr('Ошибка добавления')
    }
  }
  useEffect(() => {
    load()
  }, [])
  return (
    <div style={{ padding: 20 }}>
      <h2>Оборудование</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <ul>
        {data.map(e => (
          <li key={e.id}>
            {e.name} ({e.type}) - {e.status}
          </li>
        ))}
      </ul>
      <form onSubmit={add}>
        <input placeholder='Название' value={name} onChange={x=>setName(x.target.value)} />
        <input placeholder='Тип' value={type} onChange={x=>setType(x.target.value)} />
        <input placeholder='Статус' value={status} onChange={x=>setStatus(x.target.value)} />
        <button>Добавить</button>
      </form>
    </div>
  )
}
export default EquipmentList
