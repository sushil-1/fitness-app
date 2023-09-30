import React from 'react';
import { Stack, Typography } from '@mui/material';
import Icon from '../assets/icons/gym.png';

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  // Define the target scroll position
  let scrollTarget;

  // Detect the screen width (viewport width)
  const screenWidth = window.innerWidth;

  if (screenWidth >= 600) {
    // For screens with a width of 600px or more
    scrollTarget = 1800;
  } else {
    // For screens with a width less than 600px
    scrollTarget = 1180;
  }

  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={bodyPart === item ? { borderTop: '4px solid #FF2625', background: '#fff', borderBottomLeftRadius: '20px', width: '270px', height: '282px', cursor: 'pointer', gap: '47px' } : { background: '#fff', borderBottomLeftRadius: '20px', width: '270px', height: '282px', cursor: 'pointer', gap: '47px' }}
      onClick={() => {
        setBodyPart(item);
        // Scroll to the target position with smooth behavior
        window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
      }}
    >
      <img src={Icon} alt="dumbbell" style={{ width: '40px', height: '40px' }} />
      <Typography fontSize="24px" fontWeight="bold" fontFamily="Alegreya" color="#3A1212" textTransform="capitalize"> {item}</Typography>
    </Stack>
  );
};

export default BodyPart;
