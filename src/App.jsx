
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react'

import LayOut from "./components/LayOut/LayOut"
import Home from "./components/Home/Home"
import Cart from "./components/Cart/Cart"
import Catgory from "./components/Catgory/Catgory"
import Prands from "./components/Prands/Prands"
import Products from "./components/Products/Products"
import Register from "./components/Register/Register"
import SignIn from "./components/SignIn/SignIn"
import NotFound from "./components/NotFound/NotFound"
import CounterContextProvider from './Context/CounterContext';
import CounterUserContextProvider from './Context/UserContext';
import { useContext } from 'react';
import ProtactedRout from './components/ProtactedRout/ProtactedRout';
import Detilesproduct from './components/Detilesproduct/Detilesproduct';
import { ToastContainer } from 'react-toastify';
import { Offline } from 'react-detect-offline';

let routers = createBrowserRouter([
  {
    path: '', element: <LayOut />, children: [
      { path: "/", element: <ProtactedRout><Home /></ProtactedRout> },
      { path: 'Cart', element: <ProtactedRout><Cart /></ProtactedRout> },
      { path: 'Catgory', element: <ProtactedRout><Catgory /></ProtactedRout> },
      { path: 'Prands', element: <ProtactedRout><Prands /></ProtactedRout> },
      { path: 'Products', element: <ProtactedRout><Products /></ProtactedRout> },
      { path: 'Register', element: <Register /> },
      { path: 'SignIn', element: <SignIn /> },
      { path: 'details/:id', element: <Detilesproduct /> },
      { path: '*', element: <NotFound /> },
    ]
  },
])
export default function App() {

  return (
    <>
      <CounterUserContextProvider>

        <CounterContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </CounterContextProvider>
        <Offline>
          <i className="fa-solid fa-triangle-exclamation"></i> sorry your offline
        </Offline>

      </CounterUserContextProvider>
      <ToastContainer />

    </>
  )
}
