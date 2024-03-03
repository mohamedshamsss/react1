import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Catgory() {
    const [data, setdata] = useState([])
    async function getCatgory() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
        console.log("cat: ", data);
        setdata(data.data)
    }
    useEffect(() => {
        getCatgory()
        console.log("data: ", data);
    }, [])
    return <>
        <h1 className="text-center color-mine" >brands</h1>
        <div className="row">
            {
                data.map((item) => {
                    return <div key={item.id} className="col-md-3 ">
                        <div className="card_edite mt-5 text-center border border-1">
                            <img src={item.image} alt="catgory" className='w-100 fit-img' />
                            <h6>{item.name}</h6>
                        </div>
                    </div>
                })
            }
        </div>
    </>
}
