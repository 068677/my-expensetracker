
import React from 'react';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Signupp from './components/Signupp';
import AddRecord from './components/AddRecord';
import { AppProvider } from './context/contexter'; 



function App() {
 
  return (
    <AppProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/Signupp" element={<Signupp />} />
          <Route path="/AddRecord" element={<AddRecord />} />
        </Routes>
      </Router>
     
    </AppProvider>
  );
}

export default App;