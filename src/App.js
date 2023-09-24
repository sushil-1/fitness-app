import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import Footer from './components/Footer';
import WorkoutPlan from './pages/WorkoutPlan';

function App() {
  return (
    <Box mx="auto" maxWidth="1488px"> {/* Center content and set max width */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workoutplan" element={<WorkoutPlan />} />
        <Route path="exercise/:id" element={<ExerciseDetail />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
