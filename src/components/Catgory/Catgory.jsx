import React, { useEffect, useState } from 'react'
import style from './Catgory.module.css'
import axios from 'axios'
export default function Catgory() {
    const [data, setdata] = useState([])
    async function getCatgory() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        console.log("cat: ", data);
        setdata(data.data)
    }
    useEffect(() => {
        getCatgory()
        console.log("data: ", data);
    }, [])
    return <>
        <div className="row">
            {
                data.map((item) => {
                    return <div key={item.id} className="col-md-4 card_edite mt-5 text-center">
                        <img src={item.image} alt="catgory" className='w-100 fit-img' />
                        <h6 className="color-mine m-2 fs-3 ">{item.name}</h6>
                    </div>
                })
            }
        </div>
    </>
}
