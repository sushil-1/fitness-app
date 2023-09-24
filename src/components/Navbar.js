import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import logo from '../assets/images/Logo.png';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('');

  // Function to handle link click and set active link
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <Stack
      direction='row'
      justifyContent='space-around'
      sx={{
        gap: { sm: '60px', xs: '20px' },
        mt: { sm: '15px', xs: '10px' },
        justifyContent: 'none',
      }}
      px={'20px'}
    >
      <Link to='/'>
        <img
          src={logo}
          alt='logo'
          style={{ width: '48px', height: '48px', margin: '0 10px' }}
        />
      </Link>

      <Stack
        direction='row'
        alignItems='flex-end'
        gap='20px'
        fontSize={{ sm: '24px', xs: '20px', md: '25px' }} // Adjust font size for sm devices
      >
        <Link
          to='/'
          onClick={() => handleLinkClick('Home')} // Set active link to 'Home'
          style={{
            textDecoration: 'none',
            color: activeLink === 'Home' ? 'red' : '#3A1212', // Conditionally set color
          }}
        >
          Home
        </Link>
        <Link
          to='/workoutplan'
          onClick={() => handleLinkClick('Calculate Fitness')} // Set active link to 'Calculate Fitness'
          style={{
            textDecoration: 'none',
            color: activeLink === 'Calculate Fitness' ? 'red' : '#3A1212', // Conditionally set color
          }}
        >
          Calculate Fitness
        </Link>
      </Stack>
    </Stack>
  );
}
