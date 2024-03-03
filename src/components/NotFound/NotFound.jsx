import React from 'react'
import erorr from '../../Assets/images/error.svg'
import style from './NotFound.module.css'
export default function NotFound() {
    return <div className='d-flex justify-content-center mt-5 container pt-5'>
        <img src={erorr} alt="erorr" className="w-75" />
    </div>
}
