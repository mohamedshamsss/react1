import React from 'react'
import style from './LayOut.module.css'
import NavBar from "../NavBar/NavBar"
import { Outlet } from 'react-router-dom'
import { CounterUserContext } from '../../Context/UserContext'
import { useContext, useEffect } from 'react'

export default function LayOut() {
    let { setUserToken } = useContext(CounterUserContext)
    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            setUserToken(localStorage.getItem("userToken"))
        }
    }, [])
    return <>
        <NavBar />
        <div className="margin-top container">

            <Outlet></Outlet>
        </div>
    </>
}
