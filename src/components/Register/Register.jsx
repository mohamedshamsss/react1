import React, { useState } from 'react'
import style from './Register.module.css'
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    let [err, seterr] = useState("")
    let [isloading, setloading] = useState(false)
    let navgation = useNavigate()
    // validation Register######################
    let validation = yup.object({
        name: yup.string().required("name is required").min(3, "name must be at least 3 characters").max(10, "name must be at most 10 characters"),
        email: yup.string().required("email is required").email("email is not valid"),
        password: yup.string().required("password is required").matches(/^[A-Z][0-9a-z]{6,10}$/, "password must contain a number"),
        rePassword: yup.string().required("rePassword is required").oneOf([yup.ref("password")], "passwords must match"),
        phone: yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, "phone is not valid")
    })
    //###########################################
    // send data ################################
    async function sendData(values) {
        setloading(true)
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            .catch((err) => {
                setloading(false)
                seterr(err.response.data.message)
            })
        if (data.message == 'success') {
            setloading(false)
            navgation("./../SignIn")
        }
    }
    //###########################################
    // useFormik########################
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema: validation,
        onSubmit: sendData
    })
    //###########################################

    return <>
        <div className="container ">
            <div className="w-75 mx-auto p-4">
                <h3>Login</h3>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">name:</label>
                    <input value={formik.values.name} type="text" className="form-control mb-3" name='name' id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.name && formik.errors.name ? <div className="alert alert-danger p-2">{formik.errors.name}</div> : ""}
                    <label htmlFor="email">email:</label>
                    <input value={formik.values.email} type="email" className="form-control mb-3" name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.email && formik.errors.email ? <div className="alert alert-danger p-2">{formik.errors.email}</div> : ""}

                    <label htmlFor="password">password:</label>
                    <input value={formik.values.password} type="password" className="form-control mb-3" name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.password && formik.errors.password ? <div className="alert alert-danger p-2">{formik.errors.password}</div> : ""}
                    <label htmlFor='rePassword'> repassword:</label>
                    <input value={formik.values.rePassword} type="password" className="form-control mb-3" name='rePassword' id='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.rePassword && formik.errors.rePassword ? <div className="alert alert-danger p-2">{formik.errors.rePassword}</div> : ""}
                    <label htmlFor="phone"> phone:</label>
                    <input value={formik.values.phone} type="tle" className="form-control mb-3" name='phone' id='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.phone && formik.errors.phone ? <div className="alert alert-danger p-2">{formik.errors.phone}</div> : ""}
                    {err ? <div className="alert alert-danger p-2">{err}</div> : ""}
                    {isloading ?
                        <button type="submit" className="btn bg-mine mt-3 px-3"><i className="fa-solid fa-spinner fa-spin fa-spin-reverse px-3"></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-mine mt-3 ">Register</button>}
                    <Link to="./../SignIn">log in Page</Link>

                </form>

            </div>
        </div>
    </>
}
