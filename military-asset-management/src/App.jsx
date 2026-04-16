import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Purchases from "./components/Purchases";
import Transfers from "./components/Transfers";
import Assignments from "./components/Assignments";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
       <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;