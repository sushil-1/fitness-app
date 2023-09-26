import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { fetchData, exerciseOptions } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

export default function SearchExercises({ setExercises, bodyPart, setBodyPart }) {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState(['all']); // Initialize with 'all'

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const bodyPartsData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          exerciseOptions
        );
  
        // Check if bodyPartsData is an array before setting it in state
        if (Array.isArray(bodyPartsData)) {
          setBodyParts(['all', ...bodyPartsData]);
        } else {
          console.error('bodyPartsData is not an array:', bodyPartsData);
        }
      } catch (error) {
        console.error('Error fetching body parts:', error);
      }
    };
  
    fetchBodyParts();
  }, []);
  
  const handleSearch = async (searchKeyword) => {
    if (searchKeyword.trim()) { // Check if the search keyword is not empty or whitespace
      try {
        const exercisesData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions
        );
        const searchedExercises = exercisesData.filter(
          (exercise) =>
            exercise.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            exercise.target.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            exercise.equipment.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            exercise.bodyPart.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setExercises(searchedExercises);
        setSearch(''); // Clear the input field
        window.scrollTo({ top: 1150, left: 100, behavior: 'smooth' });
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: '44px', xs: '30px' },
        }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br />
        Should Know
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px',
            },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: 0,
          }}
          onClick={() => handleSearch(search)}
        >
          Search
        </Button>
      </Box>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          p: '20px',
        }}
      >
        <HorizontalScrollbar
          data={bodyParts}
          bodyParts
          setBodyPart={setBodyPart}
          bodyPart={bodyPart}
        />
      </Box>
    </Stack>
  );
}
