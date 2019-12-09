import React from 'react';
import './App.css';
import QueryRowList from './QueryRowList';

function App() {
  return (
    <div className="App">
      <header>SEARCH FOR SESSIONS</header>
      <main>
        <QueryRowList />
      </main>
      <footer>
        <button className="search-btn">Search</button>
      </footer>
    </div>
  );
}

export default App;
