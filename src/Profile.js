import React,{useState,useEffect} from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { useParams, useHistory, Link } from "react-router-dom"
import {omit} from 'lodash'

// import axios from 'axios'
// import { omit } from 'lodash'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios'
function Profile() {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        email: "",
        phone: "",
        password: ''
    });
    const { id } = useParams()
    let history = useHistory();
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    useEffect(() => {
        getuser()
    }, [])
    const getuser = () => {
        if (id === undefined || id === null) {
        } else {
            axios.get(`http://localhost:9090`).then((result) => {
                console.log("result.data", result)
                if (result.data.success === true) {
                    setUsername(result.data.user.username)
                    setEmail(result.data.user.email)
                    setPhone(result.data.user.phone)
                } else {
                    return;
                }
            })
        }
    }
    const handleClick = () => {
        let item = {
            username: values.username,
            email: values.email,
            phone: values.phone,
            password: values.password
        }
        console.log(item)
        axios.post("http://localhost:9090/add", item).then((res) => {
        })
        // history.push('/table')
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const validate = (event, name, value) => {
        //A function to validate each input values
        switch (name) {
            case 'username':
                if (!new RegExp(/^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/).test(value)) {
                    // we will set the error state
                    setErrors({
                        ...errors,
                        username: 'Username atleast have 3 letters'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "username");
                    setErrors(newObj);
                }
                break;
            case 'phone':
                if (!new RegExp(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/).test(value)) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        phonenumber: 'Phonenumber atleast have 10 or <=15 digits'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "phone");
                    setErrors(newObj);
                }
                break;
            case 'password':
                if (!new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/).test(value)) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        password: 'Password atleast have 10 or <=15 digits'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;
            case 'email':
                if (
                    !new RegExp(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address just like xyz2@gmail.com'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);
                }
                break;
        }
    }
    const handleChange = (event) => {
        //To stop default events    
        event.persist();
        let name = event.target.name;
        let val = event.target.value;
        validate(event, name, val);
        setValues({
            ...values,
            [name]: val,
        })
    }

  return (
    <div>
          <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2> Register Form</h2>
                    </Grid>
                    <form>
                        <TextField name='username' fullWidth label='Username'  value={values.username} onChange={handleChange} error={Boolean(errors.username)} helperText={errors.username} />
                        <TextField name='email' fullWidth label='Email'  value={values.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} />
                        <TextField name='password' fullWidth label='Passwrord'value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password}  />
                        <TextField name='phone' fullWidth label='Phonenumber' value={values.phone} onChange={handleChange} error={Boolean(errors.phone)} helperText={errors.phone}  />
                        <br />
                        <br />
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Button variant="outlined" onClick={handleClick} > submit </Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    This is a success message!
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </form>
                </Paper>
            </Grid>
    </div>
  )
}

export default Profile