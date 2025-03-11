import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('technologist'); // можно установить значение по умолчанию
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем POST запрос на /auth/register
      const response = await axios.post('/auth/register', {
        full_name: fullName,
        email,
        password,
        role
      });
      setSuccessMsg('Регистрация прошла успешно! Теперь вы можете войти.');
      setErrorMsg('');
    } catch (error) {
      console.error(error);
      setErrorMsg('Ошибка при регистрации. Возможно, email уже занят.');
      setSuccessMsg('');
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>ФИО:</label>
          <input 
            type="text" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Роль:</label>
          <input 
            type="text" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;
