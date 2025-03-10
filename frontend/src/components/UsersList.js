// src/components/UsersList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Отправляем GET-запрос на /users (proxy направит его на бэкенд)
    axios.get('/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h2>Список пользователей</h2>
      {users.length === 0 ? (
        <p>Нет пользователей</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.full_name} — {user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersList;
