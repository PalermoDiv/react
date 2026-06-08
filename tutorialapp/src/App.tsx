import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import FormsBlueprint from './pages/FormsBlueprint';
import TimerBlueprint from './pages/TimerBlueprint';
import CardsBlueprint from './pages/CardsBlueprint';
import StateBlueprint from './pages/StateBlueprint';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/forms" element={<FormsBlueprint />} />
        <Route path="/timer" element={<TimerBlueprint />} />
        <Route path="/cards" element={<CardsBlueprint />} />
        <Route path="/state" element={<StateBlueprint />} />
      </Routes>
    </BrowserRouter>
  );
}
