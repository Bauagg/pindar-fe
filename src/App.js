import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Pindar from "./pindar/Pindar";
import PindarCompare from "./pindar/Pindar_bandingkan";
import PindarDetail from "./pindar/Pindar_detail";
import PindarAjukan from "./pindar/Pindar_redirect";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pindar" element={<Pindar />} />
        <Route path="/pindarcompere" element={<PindarCompare />} />
        <Route path="/pindardetail" element={<PindarDetail />} />
        <Route path="/pindarajukan" element={<PindarAjukan />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
