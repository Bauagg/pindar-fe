import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Notifikasi from "./Notifikasi";
import TandC from "./TnC";
import PrivacyPolis from "./PrivacyPolict";
import AboutUs from "./Aboutus";

import Pindar from "./pindar/Pindar";
import PindarCompare from "./pindar/Pindar_bandingkan";
import PindarDetail from "./pindar/Pindar_detail";
import PindarAjukan from "./pindar/Pindar_redirect";

import CC from "./cc/CC";
import CCCompare from "./cc/CC_bandingkan";
import CCDetail from "./cc/CC_detail";
import CCAjukan from "./cc/CC_redirect";

import Education from "./education/Education";
import EducationDetail from "./education/Education_detail";
import CCAjukanCopy from "./cc/CC_redirect_copy";

// console.log('Halooo')

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notifikasi" element={<Notifikasi />} />
        <Route path="/tnc" element={<TandC />} />
        <Route path="/privacypolicy" element={<PrivacyPolis />} />
        <Route path="/aboutus" element={<AboutUs />} />

        <Route path="/pindar" element={<Pindar />} />
        <Route path="/pindarcompere" element={<PindarCompare />} />
        <Route path="/pindardetail" element={<PindarDetail />} />
        <Route path="/pindarajukan" element={<PindarAjukan />} />
        
        <Route path="/cc" element={<CC />} />
        <Route path="/cccompere" element={<CCCompare />} />
        <Route path="/ccdetail" element={<CCDetail />} />
        <Route path="/ccajukan" element={<CCAjukan />} />
         <Route path="/ccajukan/:id" element={<CCAjukanCopy />} />
        
        <Route path="/education" element={<Education />} />
        <Route path="/educationdetail" element={<EducationDetail />} />
        
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
