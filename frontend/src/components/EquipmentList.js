// src/components/EquipmentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EquipmentList() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    axios.get('/equipment')
      .then(response => {
        setEquipment(response.data);
      })
      .catch(error => {
        console.error('Error fetching equipment:', error);
      });
  }, []);

  return (
    <div>
      <h2>Список оборудования</h2>
      {equipment.length === 0 ? (
        <p>Нет оборудования</p>
      ) : (
        <ul>
          {equipment.map(eq => (
            <li key={eq.id}>{eq.name} — {eq.type} ({eq.status})</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EquipmentList;
