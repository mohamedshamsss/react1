import React, { useContext, useState } from 'react'
import style from './Detilesproduct.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from "react-slick";
import { toast } from 'react-toastify'
import { CounterContext } from '../../Context/CounterContext'

export default function Detilesproduct() {
    let { setData } = useContext(CounterContext)
    async function addtoCart(productId) {
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId
        }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        toast(data.message)
        setData(data)
    }
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false
    };
    let { id } = useParams()
    let [loding, setloding] = useState(false)
    function getdataDetails() {
        setloding(true)
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .finally(() => setloding(false))
    }
    let { isLoading, data, isError, isFetched } = useQuery("dataDetails", getdataDetails, {
        cacheTime: 3000
    })
    console.log(loding);
    return <>
        {loding ?
            <div className="w-100 h-100 position-absolute top-0 start-0  d-flex justify-content-center align-items-center opacity-50 bg-black z-3">
                <span className="loader"></span>
            </div>
            :
            <>
                <div className="row d-flex align-items-center pt-5  w-edite">
                    <div className="col-md-3 ">
                        {/* <img src={data?.data.data.imageCover} className='w-100' /> */}
                        <Slider {...settings}>

                            {data?.data.data.images.map((item, index) => <img key={index} src={item} className='w-100' />)}
                        </Slider>
                    </div>
                    <div className="col-md-9  pt-5">
                        <h4>{data?.data.data.title}</h4>
                        <p>{data?.data.data.description}</p>
                        <span>{data?.data.data.category.name}</span>
                        <div className="d-flex justify-content-between">
                            <span>{data?.data.data.price} EGP</span>
                            <span><i className="fa-solid fa-star star"></i> {data?.data.data.ratingsAverage}</span>
                        </div>
                        <button onClick={() => addtoCart(data?.data.data._id)} className="bg-mine btn w-100  mt-0">add to cart</button>
                    </div>
                </div>
            </>
        }
    </>
}
