import React from 'react'
import style from './SliderCatgory.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick";

export default function SliderCatgory() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        autoplay: true,
        arrows: false
    };
    function getCatgory() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    let { isLoading, data, isError, isFetched } = useQuery("catgory", getCatgory)
    return <>
        <h1>Catgory</h1>
        {data?.data.data ? <Slider {...settings}>
            {data?.data.data.map((item, index) => <img key={index} src={item.image} alt="catgory" className='grab mb-4 fit-img' />)}
        </Slider> : ""}
    </>
}
