import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";

export const Login = () => {

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 5) {
                errors.password = 'Must be more five symbols'
            }
            return errors
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));

            formik.resetForm();
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
                            error={!!(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                        <div style={{color: "red"}}>{formik.errors.email}</div>}
                        <TextField
                            type='password'
                            margin='normal'
                            label='Password'
                            error={!!(formik.touched.password && formik.errors.password)}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                        <FormControlLabel control={
                            <Checkbox {...formik.getFieldProps('rememberMe')}  name={'rememberMe'}
                                      checked={formik.values.rememberMe}
                            />}
                                          label={'Remember me'}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}