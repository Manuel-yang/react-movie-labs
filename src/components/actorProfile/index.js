import React from "react";
import Stack from "@mui/material/Stack";

const ActorProfile = (data) => {
  let details = data.details
  console.log(details)

  return(
    <>
    <p style={{fontSize: '3rem', fontWeight: 'bold'}}>{details.name}</p>
    <Stack>
      <p style={{fontSize: '2rem', fontWeight: 'bold'}}>Biography</p>
      <p>{details.biography}</p>
    </Stack>
    </>
  )
}

export default ActorProfile