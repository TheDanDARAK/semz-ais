import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем POST запрос на /auth/login (proxy настроен в package.json)
      const response = await axios.post('/auth/login', { email, password });
      // Сохраняем полученный токен в localStorage
      localStorage.setItem('token', response.data.token);
      alert('Вход выполнен успешно!');
      // Можно добавить редирект на главную страницу после успешного входа
    } catch (error) {
      console.error(error);
      setErrorMsg('Неверный email или пароль.');
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
