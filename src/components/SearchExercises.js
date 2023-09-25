import React, {useEffect, useState} from 'react';
import {Box, Button, Stack, TextField, Typography } from '@mui/material';
import { fetchData, exerciseOptions } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

export default function SearchExercises({setExercises, bodyPart, setBodyPart}) {

  const [search, setSearch] = useState('')
  const [bodyParts, setBodyParts] = useState([])

  useEffect(() => {
    const fetchExercisesData = async () => {
      console.log('insdie useeffect of search exercises..');
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      console.log('fetchedExercises data '+bodyPartsData);
      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []); 

  const handleSearch = async (searchKeyword) => {
    if (searchKeyword) {
      console.log('Search keyword:', searchKeyword);
      const exercisesData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises`,
        exerciseOptions
      );      
      console.log('searched all exercises', exercisesData);
      const searchedExercises = exercisesData.filter(
        (exercise) => 
          exercise.name.toLowerCase().includes(searchKeyword) ||
          exercise.target.toLowerCase().includes(searchKeyword) ||
          exercise.equipment.toLowerCase().includes(searchKeyword) ||
          exercise.bodyPart.toLowerCase().includes(searchKeyword)
      );
      setSearch(''); // Clear the input field
      console.log('searched exercises', searchedExercises);
      setExercises(searchedExercises);
      window.scrollTo({ top: 1150, left: 100, behavior: 'smooth' });
    }
  }  

  return (
    <Stack alignItems={'center'} mt={'37px'} justifyContent={'center'} p='20px'
    >
    <Typography
    fontWeight={700}
    sx={{
      fontSize:{ lg : '44px', xs:'30px'}
    }}
    mb='50px' textAlign={'center'}
    >
    Awesome Exercises You <br/>
    Should Know
    </Typography>
  
    <Box position={'relative'} mb='72px'>
     <TextField
     sx={{
      input : {
      fontWeight : '700',
      border : 'none',
      borderRadius : '4px'
      },
      width : { lg : '800px', xs:'350px'},
      backgroundColor:'#fff',
      borderRadius: '40px'
     }}
      height='76px'
      value={search}
      onChange={(e)=>{setSearch(e.target.value.toLowerCase())}}
      placeholder='Search Exercises'
      type='text'
     />
     <Button className='search-btn'
     sx={{
      bgcolor : '#FF2625',
      color:'#fff',
      textTransform : 'none',
      width : { lg : '175px', xs : '80px'},
      fontSize : { lg : '20px', xs : '14px'},
      height : '56px',
      position : 'absolute',
      right : 0
     }} 
     onClick={() => handleSearch(search)}
     >
     Search
     </Button>
    </Box>

    <Box sx={{
      position : 'relative', width : '100%', p : '20px'
    }}
    >
      <HorizontalScrollbar 
      data={bodyParts} 
      bodyParts 
      setBodyPart={setBodyPart} 
      bodyPart={bodyPart} />
    </Box>
    </Stack>
  )
}
