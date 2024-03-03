import React from 'react'
import style from './ForgetPassword.module.css'
export default function ForgetPassword() {
    async function sendEmail(email) {
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forget-password", {

        })
    }
    return <>
        <input type="text" placeholder="enter your email" className="form-control w-100" />
        <button onClick={() => sendEmail()} className="btn btn-info">send</button>
    </>
}
