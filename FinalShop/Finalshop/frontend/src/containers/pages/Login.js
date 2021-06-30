import React, { useContext, useState } from "react";
// import { GlobalContext } from "../../../../Context/GlobalState";
// import ActionType from "../../../../Context/globalActionType";
import {
  Avatar,
  Button,
  CssBaseline,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
//import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "../../assests/style/Style";
import axios from '../../api';
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom'
const Login = (props) => {
  const {loggedin,isLogin} = props
  const classes = useStyles();
  const history = useHistory();
  //const { dispatch } = useContext(GlobalContext);
  const initialState = {
    username: "",
    password: "",
    isSubmit: false,
    errorMessage: null,
  };
  const [data, setData] = useState(initialState);
  //const [isLogin,setLogin] = useState(false)

  // HANDLE ON_CHANGE
  const handleInputChange = (event) => {
    setData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  // HANDLE LOGIN
  const handleLogin = async(event) => {
    event.preventDefault();
    setData((prevState) => {
      return {
        ...prevState,
        isSubmit: true,
        errorMessage: null,
      };
    });
//***********new login */
    const {
      data: { message }
    } = await axios.post('/api/login', {
      data
    })
    if(message==='welcome') {
      loggedin(true,data.username);
      // history.push({
      //   pathname:'/',
      //   state : {
      //       id : 1
      //   }});
    }
    alert (message)
    //***********new login */
    setData((prevState) => {
      return {
        ...prevState,
        username: "",
        password: "",
      };
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      {isLogin && <Redirect to={{pathname: "/homepage"}}/>}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* {data.errorMessage && (
          <Alert severity="error">{data.errorMessage}</Alert>
        )} */}
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"//username
            name="username"
            autoComplete="off"
            autoFocus
            value={data.username}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"//password
            type="password"
            id="password"
            autoComplete="off"
            value={data.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            { "Sign-In"}
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;