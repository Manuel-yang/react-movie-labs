import React from "react";
import Stack from "@mui/material/Stack";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
const ActotProfileSite = (data) => {

  let details = data.details
  // console.log(details)
  return(
    <>
      <img style={{maxWidth: '280px'}} 
            src={`https://image.tmdb.org/t/p/w500/${details.profile_path}`} 
      />
      <Box maxWidth='300px'>
        <Stack>
          <p style={{fontSize: '2rem', fontWeight:'bold'}}>Personal Info</p>
          <Paper>
            <Stack style={{padding: '0 2rem'}}>
              <p style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0'}}>Know For</p>
              <p style={{marginTop: '0'}}>{details.known_for_department}</p>
            </Stack>
          </Paper>
          <Paper>
            <Stack style={{padding: '0 2rem'}}>
              <p style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0'}}>Known Credits</p>
              <p style={{marginTop: '0'}}>{details.popularity}</p>
            </Stack>
          </Paper>
          <Paper>
            <Stack style={{padding: '0 2rem'}}>
              <p style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0'}}>Gender</p>
              <p style={{marginTop: '0'}}>{details.gender==2? 'Male': 'Female'}</p>
            </Stack>
          </Paper>
          <Paper>
            <Stack style={{padding: '0 2rem'}}>
              <p style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0'}}>Birthday</p>
              <p style={{marginTop: '0'}}>{details.birthday}</p>
            </Stack>
          </Paper>
          <Paper>
            <Stack style={{padding: '0 2rem'}}>
              <p style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0'}}>Place of Birth</p>
              <p style={{marginTop: '0'}}>{details.place_of_birth}</p>
            </Stack>
          </Paper>
          <Paper>
            <Stack style={{padding: '0 2rem'}}>
              <p style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0'}}>Also Known As</p>
              {details.also_known_as.map((info) => (
                <p key={info} style={{marginBottom: '0'}}>{info}</p>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </>
  )
}

export default ActotProfileSite;