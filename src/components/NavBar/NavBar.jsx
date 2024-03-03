import React, { useContext } from 'react'
import style from './NavBar.module.css'
import { NavLink, Link, Navigate, useNavigate } from 'react-router-dom'
import logo from "../../Assets/images/freshcart-logo.svg"
import { CounterContext } from '../../Context/CounterContext'
import { CounterUserContext } from '../../Context/UserContext'

export default function NavBar() {
    let navgation = useNavigate()
    let { Data, setData } = useContext(CounterContext)
    console.log("Data: ", Data);
    let { setUserToken, UserToken } = useContext(CounterUserContext);
    function logout() {
        setUserToken(null)
        localStorage.clear()
        navgation("./../SignIn")
    }
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container">

                <img src={logo} alt="logo" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {UserToken !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="cart">Cart</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="catgory">Catgory</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="Prands">brands</NavLink>
                        </li>
                    </ul> : ""}

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a href="https://instagram.com" className="nav-link" target='_blank'><i className='fa-brands fa-instagram'></i> </a>
                        </li>
                        <li className="nav-item">
                            <a href="https://facebook.com" className="nav-link" target='_blank'><i className='fa-brands fa-facebook'></i> </a>
                        </li>
                        <li className="nav-item">
                            <a href="https://tiktok.com" className="nav-link" target='_blank'><i className='fa-brands fa-tiktok'></i> </a>
                        </li>
                        <li className="nav-item">
                            <a href="https://twitter.com" className="nav-link" target='_blank'><i className='fa-brands fa-twitter'></i> </a>
                        </li>
                        <li className="nav-item">
                            <a href="https://linkedin.com" className="nav-link" target='_blank'><i className='fa-brands fa-linkedin'></i> </a>
                        </li>
                        <li className="nav-item">
                            <a href="https://youtube.com" className="nav-link" target='_blank'><i className='fa-brands fa-youtube'></i> </a>
                        </li>
                        {UserToken !== null ?
                            <>
                                <li className="nav-item a">
                                    <NavLink className="nav-link p-0" to="cart">
                                        <span className="nav-link cursor-pointer" ><i className="fa-solid fa-cart-shopping position-relative"><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-sm">{Data?.numOfCartItems}</span></i></span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <span onClick={logout} className="nav-link cursor-pointer" >log out</span>
                                </li></> : <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="SignIn">SignIn</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Register">Register</NavLink>
                                </li>
                            </>}

                    </ul>
                </div>
            </div>
        </nav>
    </>
}
