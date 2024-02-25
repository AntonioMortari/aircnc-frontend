import {
  BrowserRouter as Router, 
  Route, 
  Routes 
} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';

export default function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" element={ <Dashboard />} />
        <Route path="/new" element={ <New/>} />
      </Routes>
    </Router>
  );
}