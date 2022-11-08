import React  from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import GTranslateIcon from '@mui/icons-material/GTranslate';

export default function movieSite({movie}) {

  function formatNumber (value) {
    if (!value) {
       return 0.00
    }
    var newVal = value.toString()
    var arr = newVal.split('.')
    var intpart = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    if (arr[1]) {
        return intpart + '.' + arr[1]
    } else {
        return intpart
    }
  }

  console.log(movie)
return(
  <>
    <Box sx={{ width: '30rem', marginTop: '8rem'}}>
    <Stack spacing={2}>
        <Paper style={{padding: '0 2rem'}}>
          <Stack style={{paddingTop: '1rem'}} direction="row" spacing={1}>
            <LocalMoviesIcon />
            <p style={{fontWeight: 'bold'}}>Status</p>
          </Stack>
          <p style={{marginLeft: '1rem'}}>{movie.status}</p>
        </Paper>
      </Stack>
      <Stack spacing={2}>
        <Paper style={{padding: '0 2rem'}}>
          <Stack style={{paddingTop: '1rem'}} direction="row" spacing={1}>
            <GTranslateIcon />
            <p style={{fontWeight: 'bold'}}>Original Language</p>
          </Stack>
          <p style={{marginLeft: '1rem'}}>{movie.spoken_languages[0].english_name}</p>
        </Paper>
      </Stack>
      <Stack spacing={2}>
        <Paper style={{padding: '0 2rem'}}>
          <Stack style={{paddingTop: '1rem'}} direction="row" spacing={1}>
            <ChatIcon />
            <p style={{fontWeight: 'bold'}}>Popularity</p>
          </Stack>
          <p style={{marginLeft: '1rem'}}>{movie.popularity}</p>
        </Paper>
      </Stack>
      <Stack spacing={2}>
        <Paper style={{padding: '0 2rem'}}>
          <Stack style={{paddingTop: '1rem'}} direction="row" spacing={1}>
            <PlayCircleIcon />
            <p style={{fontWeight: 'bold'}}>Runtime</p>
          </Stack>
          
          <p style={{marginLeft: '1rem'}}>{movie.runtime}</p>
        </Paper>
      </Stack>
      <Stack spacing={2}>
        <Paper style={{padding: '0 2rem'}}>
          <Stack style={{paddingTop: '1rem'}} direction="row" spacing={1}>
            <AttachMoneyIcon />
            <p style={{fontWeight: 'bold'}}>Revenue</p>
          </Stack>
          <p style={{marginLeft: '1rem'}}>${formatNumber(movie.revenue)}</p>
        </Paper>
      </Stack>
      <Stack spacing={2}>
        <Paper style={{padding: '0 2rem'}}>
          <Stack style={{paddingTop: '1rem'}} direction="row" spacing={1}>
            <AccountBalanceWalletIcon />
            <p style={{fontWeight: 'bold'}}>Budget</p>
          </Stack>
          <p style={{marginLeft: '1rem'}}>${formatNumber(movie.budget)}</p>
        </Paper>
      </Stack>
    </Box>
  </>
)

}
