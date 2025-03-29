import React, { useState, useEffect } from 'react'
import axios from '../axiosSetup'
function PartsList() {
  const [parts, setParts] = useState([])
  const [err, setErr] = useState('')
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  async function load() {
    try {
      const r = await axios.get('/parts')
      setParts(r.data)
    } catch (x) {
      setErr('Ошибка загрузки')
    }
  }
  async function add(e) {
    e.preventDefault()
    try {
      const r = await axios.post('/parts', { name, description: desc })
      setParts([...parts, r.data])
      setName('')
      setDesc('')
    } catch (x) {
      setErr('Ошибка добавления')
    }
  }
  useEffect(() => {
    load()
  }, [])
  return (
    <div style={{ padding: 20 }}>
      <h2>Детали</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <ul>
        {parts.map(p => (
          <li key={p.id}>
            {p.name} - {p.description}
          </li>
        ))}
      </ul>
      <form onSubmit={add}>
        <input placeholder='Название' value={name} onChange={x => setName(x.target.value)} />
        <input placeholder='Описание' value={desc} onChange={x => setDesc(x.target.value)} />
        <button>Добавить</button>
      </form>
    </div>
  )
}
export default PartsList
