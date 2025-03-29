import React, { useEffect, useState } from 'react'
import axios from '../axiosSetup'
function OperationsList() {
  const [ops, setOps] = useState([])
  const [err, setErr] = useState('')
  const [routeId, setRouteId] = useState('')
  const [equipmentId, setEquipmentId] = useState('')
  const [stepNumber, setStepNumber] = useState('')
  const [description, setDescription] = useState('')
  const [timeEstimate, setTimeEstimate] = useState('')
  async function load() {
    try {
      const r = await axios.get('/operations')
      setOps(r.data)
    } catch (x) {
      setErr('Ошибка загрузки')
    }
  }
  async function add(e) {
    e.preventDefault()
    try {
      const resp = await axios.post('/operations', { routeId, equipmentId, stepNumber, description, timeEstimate })
      setOps([...ops, resp.data])
      setRouteId('')
      setEquipmentId('')
      setStepNumber('')
      setDescription('')
      setTimeEstimate('')
    } catch (x) {
      setErr('Ошибка добавления')
    }
  }
  useEffect(() => {
    load()
  }, [])
  return (
    <div style={{ padding: 20 }}>
      <h2>Операции</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <ul>
        {ops.map(o => (
          <li key={o.id}>
            ID {o.id} / Route {o.routeId} / Equip {o.equipmentId} / Шаг {o.stepNumber} / {o.description} / {o.timeEstimate} мин
          </li>
        ))}
      </ul>
      <form onSubmit={add}>
        <input placeholder='routeId' value={routeId} onChange={x => setRouteId(x.target.value)} />
        <input placeholder='equipmentId' value={equipmentId} onChange={x => setEquipmentId(x.target.value)} />
        <input placeholder='Шаг' value={stepNumber} onChange={x => setStepNumber(x.target.value)} />
        <input placeholder='Описание' value={description} onChange={x => setDescription(x.target.value)} />
        <input placeholder='Минут' value={timeEstimate} onChange={x => setTimeEstimate(x.target.value)} />
        <button>Добавить</button>
      </form>
    </div>
  )
}
export default OperationsList
