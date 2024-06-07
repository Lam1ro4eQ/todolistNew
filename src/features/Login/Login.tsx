import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>
                            here
                        </a>
                    </p>
                    <p>or use common test account credentinals:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            label='Email'
                            margin='normal'
                            name={'email'}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <TextField
                            type='password'
                            margin='normal'
                            label='Password'
                            name={'password'}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <FormControlLabel control={<Checkbox name={'rememberMe'}/>} label={'Remember me'}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                    </form>
            </FormControl>
        </Grid>
    </Grid>
}