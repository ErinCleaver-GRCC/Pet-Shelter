import './App.css';
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import axios from 'axios';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Redirect} from 'react-router-dom'

function TabPanel(props) {



  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
 

  const [values, setValues] = React.useState({
    value: 0,
    fullName:'',
    email:'',
    password: '',
    redirectTo:null,
    user:null,
    loggedIn:false,
    showPassword: false,
    signinOrRegister:'signin'
  });

  const signinOrRegister = values.signinOrRegister;


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleToggle = (event,newvalue) => {
    
    console.log(values)
    setValues({ ...values, signinOrRegister : newvalue });
    console.log(values)
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  const login = (event)=>{
    event.preventDefault();
  //  console.log('login '+ values.email)
  //  console.log('password '+ values.password)
//return;

    axios.post('http://localhost:5000/api/auth',{
      email:values.email,
      password:values.password
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if( response.status === 400 || response.status === 500){
      console.log('invalid authentication')
      }

     else if(response.status === 200 ){
        console.log('user is authenticated')
        setValues({ ...values, 
          loggedIn : true,
          user:response.data,
          redirectTo:'/'
        });
        localStorage.setItem('user',JSON.stringify(response.data))
//1-load data from token
//2-save user in storage
//3-redirect the user
      }
    })
    .catch(function (error) {
      console.log(error);
    });



  };

  const register = (event)=>{
    event.preventDefault();
    console.log(values.email)

  

   
    
    axios.post('http://localhost:5000/api/register',{
      fullName:values.fullName,
      email:values.email,
      password:values.password
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if(response.data.token){
        console.log('user registered')

      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
  

  };
 


if(values.redirectTo){
  return (<Redirect to={{pathname: values.redirectTo}} />)
} else {

  return (
    <Box sx={{ width: '100%',paddingTop:'80px;' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

      <ToggleButtonGroup
      color="primary"
      value={values.signinOrRegister}
      exclusive
      onChange={handleToggle}
    >
      <ToggleButton value="signin" disabled={signinOrRegister == 'register' ? false : true }>Login</ToggleButton>
      <ToggleButton value="register" disabled={signinOrRegister == 'signin' ? false : true }>Register</ToggleButton>

    </ToggleButtonGroup>


      </Box>
      <div hidden={signinOrRegister == 'register' ? true : false }  >
       
       <Divider>Login</Divider>


<form method="post" onSubmit={login}>
<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type={'email'}
            value={values.email}
            onChange={handleChange('email')}
            endAdornment={
              <InputAdornment position="end">
    
              </InputAdornment>
            }
            label="Email"
          />
        </FormControl>

       <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button  sx={{ m: 1, width: '25ch',height:'7ch' }} variant="contained"
            id="outlined-adornment-submit"
            type={'submit'}
            label="Login"
          >{'Login'}
        </Button >
</form>
      </div>
      <div hidden={signinOrRegister == 'signin' ? true : false } >
      <Divider>Register</Divider>
      <form method="post" onSubmit={register}>

      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">fullName</InputLabel>
          <OutlinedInput
            id="outlined-adornment-name"
            type={'text'}
            value={values.fullName}
            onChange={handleChange('fullName')}
            endAdornment={
              <InputAdornment position="end">
    
              </InputAdornment>
            }
            label="fullName"
          />
        </FormControl>

<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email2"
            type={'email'}
            value={values.email}
            onChange={handleChange('email')}
            endAdornment={
              <InputAdornment position="end">
    
              </InputAdornment>
            }
            label="Email"
          />
        </FormControl>

       <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password2"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button  sx={{ m: 1, width: '25ch',height:'7ch' }} variant="contained"
            id="outlined-adornment-submit"
            type={'submit'}
            label="Register"
          >{'Register'}
        </Button >
</form>
      </div>

    </Box>
  );

}

}



class App extends Component {
 
  state = {
    loggedIn:false,
    user:null,
    results:[]
  }

  render(){

    return (
      <div className="App">
  <BasicTabs />
      </div>
    )

  }


}

export default App;
