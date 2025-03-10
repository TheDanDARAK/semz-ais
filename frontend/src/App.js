import React from 'react';
import UsersList from './components/UsersList';
import EquipmentList from './components/EquipmentList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SEMZ AIS</h1>
      </header>
      <main>
        <UsersList />
        <EquipmentList />
      </main>
    </div>
  );
}

export default App;
