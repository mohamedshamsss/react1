import React from 'react'
import style from './ProtactedRout.module.css'
import { Navigate } from 'react-router-dom'
export default function ProtactedRout(props) {
    if (localStorage.getItem('userToken') != null) {
        return props.children
    } else {
        return <Navigate to="/SignIn" />
    }

}
