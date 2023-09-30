import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/workout.css';
import WorkoutPlanDetails from '../components/WorkoutPlanDetails';
import Loader from '../components/Loader';

export default function WorkoutPlan() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [level, setLevel] = useState('level_1');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [dailyCalorieData, setDailyCalorieData] = useState(null);
  const [idealWeightData, setIdealWeightData] = useState(null); // State for ideal weight data
  const [activitiesData, setActivitiesData] = useState(null);
  const [selectedIntensityLevel, setSelectedIntensityLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const headers = {
    'X-RapidAPI-Key': process.env.REACT_APP_FITNESS_CALC_API_KEY,
    'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
  };

  const fetchDailyCalorieData = async () => {
    setIsLoading(true); // Set isLoading to true when fetching starts
    const url = `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${age}&gender=${gender}&weight=${weight}&height=${height}&activitylevel=${level}`;

    try {
      const response = await fetch(url, { method: 'GET', headers });
      const data = await response.json();
  
      setDailyCalorieData(data);
    } catch (error) {
      console.error('Error fetching daily calorie data:', error);
    } finally {
      setIsLoading(false); // Reset isLoading when fetching is completed
    }
  };

  // Function to fetch ideal weight data
  const fetchIdealWeightData = async () => {
    const url = `https://fitness-calculator.p.rapidapi.com/idealweight?gender=${gender}&height=${height}`;
    const options = {method: 'GET', headers};

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      setIdealWeightData(data);
    } catch (error) {
      console.error(error);
    }
  };
 // Function to fetch activity data
 const fetchActivitiesData = async () => {
    const url = `https://fitness-calculator.p.rapidapi.com/activities?intensitylevel=${selectedIntensityLevel}`;
    const options = {method: 'GET', headers};
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      setActivitiesData(data);
    } catch (error) {
      console.error('Error fetching activities data:', error);
    }
  };  

  useEffect(() => {
    if (buttonClicked) {
      <Loader/>
      fetchDailyCalorieData();
      // Fetch ideal weight
      fetchIdealWeightData();
      // Fetch Activities
      fetchActivitiesData();
    }
    setButtonClicked(false);
  }, [buttonClicked]);

  const handleCalculate = () => {
    // Validate input fields before calculating
    if (age <= 0 || isNaN(age) || weight <= 0 || isNaN(weight) || height <= 0 || isNaN(height)) {
      alert('Please enter valid values for Age, Weight, and Height.');
    } else {
      setButtonClicked(true);
    }
  };

  const handleIntensityLevelChange = (e) => {
    setSelectedIntensityLevel(e.target.value);
  };
  
// Group activities by activity category
const groupedActivities = activitiesData?.data && Array.isArray(activitiesData.data) && activitiesData.data.length > 0
  ? activitiesData.data.reduce((grouped, activity) => {
    const category = activity.activity;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(activity);
    return grouped;
  }, {})
  : {};

  return (
<div className="grid-container">
<div className="grid-row">
  <div className="grid-item">
    <label className="label">Age (year)</label>
    <input
      className="text-field"
      placeholder="(year)"
      type="number"
      value={age}
      onChange={(e) => setAge(e.target.value)}
    />
  </div>
  <div className="grid-item">
    <label className="label">Gender </label>
      <label className="radio-label">
        <input
          className='radio-fitness'
          type="radio"
          checked={gender === 'male'}
          onChange={() => setGender('male')}
        />
        M
      </label>
      <label className="radio-label">
        <input
          className='radio-fitness'
          type="radio"
          checked={gender === 'female'}
          onChange={() => setGender('female')}
        />
         F 
      </label>
  </div>
</div>
<div className="grid-row">
  <div className="grid-item">
    <label className="label">Weight (kg)</label>
    <input
      className="text-field"
      placeholder="(kg)"
      type="number"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
    />
  </div>
  <div className="grid-item">
    <label className="label">Height (cm)</label>
    <input
      className="text-field"
      placeholder="(cm)"
      type="number"
      value={height}
      onChange={(e) => setHeight(e.target.value)}
    />
  </div>
</div>
<div className="grid-row">
  <div className="grid-item">
    <label className="label">Exercise Level</label>
    <select
      className="select"
      value={level}
      onChange={(e) => setLevel(e.target.value)}
    >
      <option value="level_1">Sedentary: little or no exercise</option>
      <option value="level_2">Exercise 1-3 times/week</option>
      <option value="level_3">Exercise 4-5 times/week</option>
      <option value="level_4">Daily exercise or intense exercise 3-4 times/week</option>
      <option value="level_5">Intense exercise 6-7 times/week</option>
      <option value="level_6">Very intense exercise daily, or physical job</option>
    </select>
  </div>
</div>
<div className="grid-row">
  <div className="grid-item">
    <label className="label">Exercise Intensity</label>
    <select
      className="select"
      value={selectedIntensityLevel}
      onChange={handleIntensityLevelChange}
    >
      <option value={1}>Level 1</option>
      <option value={2}>Level 2</option>
      <option value={3}>Level 3</option>
      <option value={4}>Level 4</option>
      <option value={5}>Level 5</option>
      <option value={6}>Level 6</option>
      <option value={7}>Level 7</option>
      <option value={8}>Level 8</option>
      <option value={9}>Level 9</option>
    </select>
  </div>
</div>
<div className="grid-row">
  <button className="calculate-button" onClick={handleCalculate}>
    Calculate
  </button>
</div>
{isLoading ? (
  <Loader /> // Display the loader when isLoading is true
) : (
  <WorkoutPlanDetails
    idealWeightData={idealWeightData}
    dailyCalorieData={dailyCalorieData}
    groupedActivities={groupedActivities}
  />
)}
</div>
  );
};
