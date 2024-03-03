import React, { useContext, useState } from 'react'
import style from './SignIn.module.css'
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CounterUserContext } from '../../Context/UserContext';

export default function SignIn() {
    let { UserToken, setUserToken } = useContext(CounterUserContext)
    let [err, seterr] = useState("")
    let [isloading, setloading] = useState(false)
    let navgation = useNavigate()
    // validation Register######################
    let validation = yup.object({
        email: yup.string().required("email is required").email("email is not valid"),
        password: yup.string().required("password is required").matches(/^[A-Z][0-9a-z]{6,10}$/, "password must contain a number"),

    })
    //###########################################
    // send data ################################
    async function sendData(values) {
        setloading(true)
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            .catch((err) => {
                setloading(false)
                seterr(err.response.data.message)
            })
        if (data.message == 'success') {
            setloading(false)
            localStorage.setItem("userToken", data.token)
            setUserToken(data.token)
            navgation("/")
        }
    }
    //###########################################
    // useFormik########################
    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validation,
        onSubmit: sendData
    })
    //###########################################

    return <>
        <div className="container ">
            <div className="w-75 mx-auto p-4">
                <h3>Register now</h3>
                <form onSubmit={formik.handleSubmit}>

                    <label htmlFor="email">email:</label>
                    <input value={formik.values.email} type="email" className="form-control mb-3" name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.email && formik.errors.email ? <div className="alert alert-danger p-2">{formik.errors.email}</div> : ""}

                    <label htmlFor="password">password:</label>
                    <input value={formik.values.password} type="password" className="form-control mb-3" name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.password && formik.errors.password ? <div className="alert alert-danger p-2">{formik.errors.password}</div> : ""}

                    {isloading ?
                        <button type="submit" className="btn bg-mine mt-3 px-3"><i className="fa-solid fa-spinner fa-spin fa-spin-reverse px-3"></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-mine mt-3 ">Login</button>}


                </form>

            </div>
        </div>
    </>
}
