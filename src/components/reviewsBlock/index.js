import React from "react";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';

function checkAvatarPath(path) {
  if (path && path.includes("https")) {
    return path.substring(1,path.length-1)
  }
  else {
    return "https://image.tmdb.org/t/p/w500/"+path
  }
}

function changeTheFormatOfTime(date) {
  return date.slice(0,10)
}


const reviewsBlock = (props) => {
    

  return (
    <>
    <Container>
        {props.reviews.map((review) => (
          <Paper style={{marginBottom: '2rem'}} key={review.id}>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ width: 56, height: 56 }} style={{margin: '1rem'}} src={checkAvatarPath(review.author_details.avatar_path)} />
              <Stack>
                <p style={{fontSize: '1.4rem', marginTop: '1rem', marginBottom:'0'}}>{review.author_details.username}</p>
                <Stack direction="row" spacing={2}>
                  <p style={{marginTop: '1%'}}>{changeTheFormatOfTime(review.created_at)}</p>
                  <Rating name="half-rating-read" defaultValue={review.author_details.rating/2} precision={0.5} readOnly />
                </Stack>
              </Stack>
            </Stack>
            <Paper style={{padding:"2rem"}}>
              <p>{review.content}</p>
            </Paper>
          </Paper>
        ))}
      </Container>
    </>
  )
}

export default reviewsBlock;