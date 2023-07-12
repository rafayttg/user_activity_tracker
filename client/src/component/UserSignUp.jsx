import React from 'react'
import { Box, Button } from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import instance from '../helpers/axios';
import { Link, useNavigate } from 'react-router-dom'

function UserSignUp() {

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
                            instance.post('users/signup', {
                                email: values.email,
                                password: values.password
                            }).then(resp => {
                                if (resp.data === 'user registered successfully') {
                                    alert(resp.data)
                                    navigate('/')
                                }
                                else {
                                    alert(resp.data)
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form style={{ width: '350px' }}>
                            <h2>Sign Up</h2>
                            <Field style={{ width: '100%', padding: '15px', marginTop: '10px' }} type="email" name="email" placeholder='Email' label="email" variant="outlined" />
                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                            <Field style={{ width: '100%', padding: '15px', marginTop: '10px' }} type="password" placeholder='password' name="password" label="password" variant="outlined" />
                            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                            <button style={{ marginTop: '10px', borderRadius: '0' }} type="submit" disabled={isSubmitting}>
                                Sign up
                            </button>
                        </Form>
                    )}

                </Formik>
                <p> Already have an account?</p>

                <Box sx={{ textAlign: 'end' }}>
                    <Link to={'/'}>
                        <Button style={{ marginTop: '10px', borderRadius: '0' }} >
                            Sign in
                        </Button>
                    </Link>
                </Box>
            </Box>
        </>
    )
}

export default UserSignUp