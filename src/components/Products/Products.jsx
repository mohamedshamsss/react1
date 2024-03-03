import React, { useContext, useEffect, useState } from 'react'
import Cart from '../Cart/Cart'
import Product from '../Products/Products'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import Slider from "react-slick";
import image1 from '../../Assets/images/slider-image-1.jpeg'
import image2 from '../../Assets/images/slider-image-2.jpeg'
import image3 from '../../Assets/images/slider-image-3.jpeg'
import image4 from '../../Assets/images/grocery-banner.png'
import image5 from '../../Assets/images/grocery-banner-2.jpeg'
import SliderCatgory from '../SliderCatgory/SliderCatgory'
import { toast } from 'react-toastify'
import { CounterContext } from '../../Context/CounterContext'

export default function Home() {
    let { setData } = useContext(CounterContext)
    let [search, setSearch] = useState({})
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
        setSearch(data)
    }

    function getNewProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }
    let { isLoading, data, isError, isFetched } = useQuery("newProducts", getNewProducts)
    return (
        <div className="container my-5" >
            <input onChange={console.log("x")} type="text" placeholder="search" className="form-control w-100" />

            {isLoading ?
                <div className="w-100 h-100 position-absolute top-0 start-0  d-flex justify-content-center align-items-center opacity-50 bg-black z-3">
                    <span className="loader"></span>
                </div> : <div className="row g-4">
                    {data?.data.data.map((item) => {
                        return <div key={item.id} className="col-lg-2 col-md-3 col-sm-4 card_edite mt-5" >
                            <div className="cursor-pointer">
                                <Link className='text-decoration-none text-black' to={`/details/${item.id}`}>
                                    <img src={item.imageCover} className='w-100' />
                                    <h6 className="color-mine">{item.category.name}</h6>
                                    <h3>{item.title.split(" ").slice(0, 2).join(" ")}</h3>
                                    <div className="d-flex justify-content-between py-3 px-1">
                                        <span>{item.price} EGP</span>
                                        <span><i className="fa-solid fa-star star"></i> {item.ratingsAverage}</span>
                                    </div>
                                </Link>
                                <button onClick={() => addtoCart(item.id)} className="bg-mine btn w-100 transetion_transform">add to cart</button>
                            </div>
                        </div>
                    })}
                </div>
            }


        </div>
    )
}
