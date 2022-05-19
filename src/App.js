import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import RequireAuth from './Components/RequireAuth/RequireAuth';
import Todo from './Components/Todo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='todo' element={
          <RequireAuth><Todo/></RequireAuth>
        } />
      </Routes>
    </div>
  );
}

export default App;
