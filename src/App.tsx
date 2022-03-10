import { useState } from 'react';
import './App.css';
import { AppRouter } from './router';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-class">
      <AppRouter />
    </div>
  );
}

export default App;
