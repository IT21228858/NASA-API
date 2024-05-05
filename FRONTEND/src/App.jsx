import Reaact, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FooterSection from "./component/Footer.jsx";
import HeaderSection from "./component/Header.jsx";
import FeatureSection from "./component/FeatureSection.jsx";
import CarousalSection from "./component/CarousalSection.jsx";
import APOD from "./pages/AstronomyDay.jsx";
import MARS from "./pages/MarsRoverPhoto.jsx";
import HomePage from "./pages/Home.jsx";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <BrowserRouter>
      <HeaderSection />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/apod" element={<APOD />} />
        <Route path="/mars" element={<MARS />} />
        <Route path="/feature" element={<FeatureSection />} />
        <Route path="/carousal" element={<CarousalSection />} />
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
}
