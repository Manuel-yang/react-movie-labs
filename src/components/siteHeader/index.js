import  React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from "react-router-dom";
import { searchMovieApi, userRegister, userLogin } from '../../api/tmdb-api'
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import DirectionsIcon from '@mui/icons-material/Directions';
import ButtonGroup from '@mui/material/ButtonGroup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function DrawerAppBar() {
  const options = ['Sign up', 'Login'];
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const existingToken = localStorage.getItem("token")
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  

    //Function to put JWT token in local storage.
    const setToken = (data) => {
      localStorage.setItem("token", data);
      setAuthToken(data);
    }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handelMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true});
  }

  
  const [open4SignUp, setOpen4SignUp] = React.useState(false);
  const [open4Login, setOpen4Login] = React.useState(false);

  const handleClickOpen4SignUp = () => {
    setErrMsg("")
    setOpen4SignUp(true);
  };

  const handleClickOpen4Login = () => {
    setErrMsg("")
    setOpen4Login(true);
  };

  const handleSubmit4SignUp =  async () => {
    const username = document.getElementById("username4SignUp").value
    const password = document.getElementById("password4SignUp").value
    const email = document.getElementById("email4SignUp").value
    if(username && password && email) {
      try {
        await userRegister(username, password, email)
        setOpen4SignUp(false);
      } catch (error){
        setErrMsg(error.response.data.msg)
      }
      
      
    }
  };

  const handleSubmit4Login = async () => {
    const username = document.getElementById("username4Login").value
    const password = document.getElementById("password4Login").value
    if(username && password) {
      try {
        let result = await userLogin(username, password)
        if(result.data.token) {
          setToken(result.data.token);
          setIsAuthenticated(true);
          setUserName(username)
          setOpen4Login(false);
        }
      } catch (error) {
        console.log(error.response.data.msg)
        setErrMsg(error.response.data.msg)
      }
    }
  };

  const userLogOut = () => {
    setToken("")
    setIsAuthenticated(false)
    setUserName("")
  }

  const handleClose4SignUp = () => {
    setOpen4SignUp(false);
  }

  const handleClose4Login = () => {
    setOpen4Login(false);
  }



const menuOptions = [
  { label: "Home", path: "/"},
  { label: "Favourites", path: "/movies/favorites"},
  { label: "Upcoming", path: "/movies/upcoming"},
]

  let inputData;

  const handle4change = (e) => {
    inputData = e.target.value
  }

  const click2search = async () => {
    let data = await searchMovieApi(inputData)
    handelMenuSelect(`/movies/${data.results[0].id}`)
  }
  
  const search4movie = async (input) => {
    let data = await searchMovieApi(input)
    handelMenuSelect(`/movies/${data.results[0].id}`)
  }

  const handle4search = (e) => {
    if(e.keyCode === 13 && e.target.value) {
      search4movie(e.target.value)
      console.log(e.target.value)
    }
  }

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);


  const handleMenuItemClick = (event, index) => {
    if(index === 0) {
      handleClickOpen4SignUp()
    }
    else if(index === 1) {
      handleClickOpen4Login()
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };



  return (
    <Box sx={{ display: 'flex'}}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
          {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            YanAemons
          </Typography>
          <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              onChange={handle4change}
              onKeyUp={handle4search}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton id="searchIcon" onClick={click2search} color="primary" sx={{ p: '10px' }} aria-label="directions">
              <DirectionsIcon />
            </IconButton>
          </Paper>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {menuOptions.map((item) => (
              <Button key={item.label} sx={{ color: '#fff' }} onClick={() => handelMenuSelect(item.path)}>
                {item.label}
              </Button>
            ))}
          </Box>
          <React.Fragment>
            <ButtonGroup variant="secondary" ref={anchorRef} aria-label="split button">
              <Button
                size="small"
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <AccountCircleIcon />
                <p style={{ margin: "0.5rem"}}>{userName ? userName : ''}</p>
              </Button>
            </ButtonGroup>
            <Popper
              sx={{
                zIndex: 1,
              }}
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu" autoFocusItem>
                        {userName ? <MenuItem onClick={userLogOut}>Log out</MenuItem> : options.map((option, index) => (
                          <MenuItem
                            key={option}
                            onClick={(event) => handleMenuItemClick(event, index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </React.Fragment>
        </Toolbar>
      </AppBar>

      <div>
        <Dialog open={open4SignUp} onClose={handleClose4SignUp}>
          <DialogTitle>Sign up for your account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address, username and password
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username4SignUp"
              label="Username"
              type="name"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="email4SignUp"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="password4SignUp"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <Stack sx={{ width: '100%' }} spacing={2}> 
            {errMsg ? <Alert severity="error">{errMsg}</Alert> : ""}
          </Stack>
          <DialogActions>
            <Button onClick={handleClose4SignUp}>Cancel</Button>
            <Button onClick={handleSubmit4SignUp}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={open4Login} onClose={handleClose4Login}>
          <DialogTitle>Login to your account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your username and password
            </DialogContentText>
            <TextField
              margin="dense"
              id="username4Login"
              label="Username"
              type="name"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="password4Login"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <Stack sx={{ width: '100%' }} spacing={2}> 
            {errMsg ? <Alert severity="error">{errMsg}</Alert> : ""}
          </Stack>
          <DialogActions>
            <Button onClick={handleClose4Login}>Cancel</Button>
            <Button onClick={handleSubmit4Login}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>



      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
