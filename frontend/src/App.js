import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersList from './components/UsersList';
import EquipmentList from './components/EquipmentList';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>SEMZ AIS</h1>
          <nav>
            <Link to="/">Главная</Link> |{' '}
            <Link to="/login">Вход</Link> |{' '}
            <Link to="/register">Регистрация</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <div>
                <UsersList />
                <EquipmentList />
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
