import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import LandingPage from './LandingPage'


function App() {
  
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<Login />} /> */}

      </Routes>
    </Router>
  )
}

export default App
