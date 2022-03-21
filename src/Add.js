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
function Register() {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [description, setdescription] = useState('');
    const [quantities, setquantities] = useState('');
    const [price, setprice] = useState('');
    const [profile, setProfile] = useState([]);
    const [errors, setErrors] = useState({});
    
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
                    setUsername(result.data.user[0].username)
                    setdescription(result.data.user[0].description)
                    setquantities(result.data.user[0].quantities)
                    setprice(result.data.user[0].price)
                    setProfile(result.data.user[0].profile_url)
                } else {
                    return;
                }
            })
        }
    }
    const handleClick = () => {
        let FD = new FormData();
            FD.append('username', username);
            FD.append('description', description);
            FD.append('quantities', quantities);
            FD.append('price', price);
                FD.append('profile_file',profile[0])
        //     axios.post('http://localhost:8000/', FD)
        // let item = {

        //     username: username,
        //     description: description,
        //     quantities: quantities,
        //     price: price,
        //     profile_url:profile
        // }
        // console.log(item)
        let token = localStorage.getItem('token')
        axios.post(`http://localhost:9090/add`, FD,{ headers:{'x-access-token':token}}).then((res) => {
        })
        history.push('/Table')
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
 
  

  return (
    <div>
          <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2> Add Food Item</h2>
                    </Grid>
                    <form>
                        <TextField name='username' fullWidth label='Username'  value={username} onChange={(e) => setUsername(e.target.value)} />
                        <TextField name='description' fullWidth label='description'  value={description} onChange={(e) => setdescription(e.target.value)} />
                        <TextField name='quantities' fullWidth label='quantities'value={quantities} onChange={(e) => setquantities(e.target.value)}   />
                        <TextField name='price' fullWidth label='price' value={price} onChange={(e) => setprice(e.target.value)}   />
                        <TextField name="profile" type="file" onChange={(e) => setProfile(e.target.files)} />
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

export default Register