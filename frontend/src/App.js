import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import EquipmentList from './components/EquipmentList'
import UsersList from './components/UsersList'
import PartsList from './components/PartsList'
import RoutesList from './components/RoutesList'
import OperationsList from './components/OperationsList'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/equipment' element={<EquipmentList />} />
        <Route path='/users' element={<UsersList />} />
        <Route path='/parts' element={<PartsList />} />
        <Route path='/routes' element={<RoutesList />} />
        <Route path='/operations' element={<OperationsList />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
