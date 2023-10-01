
import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';

// Helper function to render selected goal data
const renderSelectedGoalData = (selectedGoalData) => {
  if (selectedGoalData == null) {
    return <div>Daily Calory Requirements</div>; // Don't display anything if selectedGoalData 
  }

  if (typeof selectedGoalData === 'object') {
    // If selectedGoalData is an object
    return (
      <div>
        {Object.entries(selectedGoalData).map(([key, value]) => (
          <div key={key}>
            <strong style={{ fontSize: '15px' }}>
             {key === 'calory' ? 'daily calories ' : key+' (kg) '}
            </strong>
            <strong style={{ fontSize: '24px' }}>
             {key === 'calory' ? Math.floor(value) : typeof value === 'number' ? value : value.replace(/[^\d.-]/g, '')}
            </strong>          
          </div>
        ))}
      </div>
    );
  } else {
    // If selectedGoalData is a single value
    return (
      <div style={{marginBottom: '5px'}}>
          <strong style={{ fontSize: '28px', marginLeft: '15px' }}>{Math.floor(selectedGoalData)}</strong>
          <br/>
          <strong style={{ fontSize: '15px' }}>daily calories </strong>
      </div>
    );
  }  
};

const WorkoutPlanDetails = ({ idealWeightData, dailyCalorieData, groupedActivities }) => {

  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedGoalData, setSelectedGoalData] = useState(null);
  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [isIdealWeightModalOpen, setIsIdealWeightModalOpen] = useState(false); // State for the ideal weight modal
  const [isBMRModalOpen, setIsBMRModalOpen] = useState(false); // State for the BMR modal

  const handleGoalSelect = (e) => {
    const goal = e.target.value;
    setSelectedGoal(goal);

    // Set the selected goal's data
    if (dailyCalorieData?.data?.goals && goal in dailyCalorieData.data.goals) {
      setSelectedGoalData(dailyCalorieData.data.goals[goal]);
    } else {
      setSelectedGoalData(null);
    }
  };

  const handleActivityTypeSelect = (category) => {
    setSelectedActivityType((prevType) => (category === prevType ? '' : category));
  };

  const openIdealWeightModal = () => {
    setIsIdealWeightModalOpen(true);
  };

  const openBMRModal = () => {
    setIsBMRModalOpen(true);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="details-container">

      <div className="details-row">
        {/* ideal weight in kg */}
          {idealWeightData?.data && (
          <div className="details-item">
            <div onClick={openIdealWeightModal} style={{ fontSize: '36px', fontWeight: 'bold', margin: 'auto' }}>
              {(
                Object.values(idealWeightData.data).reduce((total, weight) => total + weight, 0) /
                Object.values(idealWeightData.data).length
              ).toFixed(2)}
            </div>
            <div onClick={openIdealWeightModal} style={{ fontSize: '16px', fontWeight: 'bold', marginTop: 'auto' }}>
               Ideal Weight (kg)
            </div>
            <Modal
              open={isIdealWeightModalOpen}
              onClose={() => setIsIdealWeightModalOpen(false)}
              aria-labelledby="modal-idealweight"
              aria-describedby="modal-idealweight"
              style={{
                
              }}
            >
              <Box sx={style}>
                the weight at which an individual is considered to be at their healthiest and most optimal for their body composition and overall well-being. It's important to note that there is no one-size-fits-all ideal weight, as it varies from person to person based on factors such as age, gender, height, muscle mass, and body fat percentage.
              </Box>
            </Modal>
          </div>
        )}
        
        {/* BMR data */}      
        {dailyCalorieData?.data && (
          <div className="details-item" >
            <div onClick={openBMRModal} style={{ fontSize: '36px', fontWeight: 'bold', margin: 'auto' }}>{dailyCalorieData.data.BMR}
            </div>
            <div onClick={openBMRModal} style={{ fontSize: '16px', fontWeight: 'bold', marginTop: 'auto' }}>
              BMR
            </div>
            <Modal
              open={isBMRModalOpen}
              onClose={() => setIsBMRModalOpen(false)}
              aria-labelledby="modal-bmr"
              aria-describedby="modal-bmr"
            >
              {/* Modal content */}
              <Box sx={style}>
                The BMI value refers to the body mass index of a person. It is calculated by using the mass(weight) and height of him/her. The unit of weight is kg while height is cm. The main goal of using it is to decide whether a person is overweight, normal-weight, or underweight.
              </Box>
            </Modal>
          </div>
        )}
        {/* Daily calories needed */}
        {dailyCalorieData && (
          <div className="details-item">
            <div style={{marginBottom: '8px'}}>
              {renderSelectedGoalData(selectedGoalData)}
            </div>
            <select
              className="select-container"
              value={selectedGoal}
              onChange={handleGoalSelect}
            >
              <option value="">Select Daily Caolry Goal</option>
              {dailyCalorieData?.data?.goals &&
                Object.keys(dailyCalorieData.data.goals).map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
            </select>
         </div>        
        )}
      </div>

      {groupedActivities && Object.keys(groupedActivities).length > 0 && (
        <div className="activities-container">
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Activity Types</div>
          <div className="activity-types" style={{fontWeight: 'bold'}}>
            {Object.keys(groupedActivities).map((category, index) => (
              <div
                key={index}
                className={`activity-type ${category === selectedActivityType ? 'selected' : ''}`}
                onClick={() => handleActivityTypeSelect(category)}
                style={{
                  background : category === selectedActivityType ? 'rgb(9, 133, 102)' : '',
                  color : category === selectedActivityType ? 'white' : '',
                }}
              >
                {category}
              </div>
            ))}
          </div>
          {selectedActivityType && (
            <div className="activity-title-details">
              <div className="activity-type-title" style={{ fontSize: '24px', fontWeight: 'bold', color: 'rgb(9, 133, 102)' }}>
                {selectedActivityType}
              </div>
              <div className="activities-list" style={{fontWeight: 'bold'}}>
                {groupedActivities[selectedActivityType]?.map((activity) => (
                 <div key={activity._id} className="activity">
                   <p>Description: {activity.description}</p>
                   <p>Met Value: {activity.metValue}</p>
                   <p>Intensity Level: {activity.intensityLevel}</p>
                  </div>
                ))}
              </div> 
            </div>         
          )}          
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanDetails;
