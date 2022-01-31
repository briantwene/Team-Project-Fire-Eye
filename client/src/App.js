import React from "react";
import "./css/App.css";
import Sidebar from "./components/Sidebar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <>
    <Router>
      <Sidebar/>
      <Routes>
        <Route path='/'/>
      </Routes>

    </Router>
    </>
  );
}

export default App;
