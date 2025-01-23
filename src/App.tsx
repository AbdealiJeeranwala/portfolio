import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import About from "./components/About";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Career from "./components/Career";
import WhatIDo from "./components/WhatIDo";
import TechStack from "./components/TechStack";
import "./App.css";

function App() {
  useEffect(() => {
    document.body.style.overflowY = "auto";
  }, []);

  return (
    <>
      <Analytics />
      <main>
        <Navbar />
        <Landing />
        <About />
        <WhatIDo />
        <TechStack />
        <Career />
        <Work />
        <Contact />
      </main>
    </>
  );
}

export default App;
