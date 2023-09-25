import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import Footer from './components/Footer';
import WorkoutPlan from './pages/WorkoutPlan';

function App() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh" // This ensures the content takes up at least the full viewport height
    >
      <CssBaseline /> {/* Apply a baseline CSS reset */}
      <Navbar />
      <Box flexGrow={1}> {/* This makes the content area flex and take up remaining space */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workoutplan" element={<WorkoutPlan />} />
          <Route path="exercise/:id" element={<ExerciseDetail />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
