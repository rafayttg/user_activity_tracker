import React from 'react'
import { Box, TextField, Button } from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, json } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import instance from '../helpers/axios';



function UserSignIn() {
    const navigate = useNavigate()

    return (
        <>
            <Box sx={{ border: '1px solid #ccc', padding: '15px', background: '#fff' }}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required !';
                            errors.password = 'Required !'
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            instance.post(`users/signin`, {
                                email: values.email,
                                password: values.password
                            }).then(resp => {
                                const token = resp.data;
                                localStorage.setItem('token', token)
                                localStorage.setItem('email', values.email)                    
                                navigate('/activities')


                            }).catch(err => {
                                alert(err.response.data.message)
                                console.log(err)

                            })
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form style={{ width: '350px' }}>
                            <h2>Sign In</h2>
                            <Field style={{ width: '100%', padding: '15px', marginTop: '10px' }} type="email" name="email" placeholder='Email' label="email" variant="outlined" />
                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                            <Field style={{ width: '100%', padding: '15px', marginTop: '10px' }} type="password" name="password" placeholder='password' label="password" variant="outlined" />
                            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                            <button style={{ marginTop: '10px', borderRadius: '0' }} type="submit" disabled={isSubmitting}>
                                Sign In
                            </button>
                        </Form>
                    )}

                </Formik>

                <p>Not Registered? Sign Up</p>

                <Box sx={{ textAlign: 'end' }}>
                    <Link to={'/signup'}>
                        <button style={{ marginTop: '10px', borderRadius: '0' }} >
                            Sign Up
                        </button>
                    </Link>
                </Box>

            </Box>
        </ >
    )
}

export default UserSignIn