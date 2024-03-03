import React, { useContext, useEffect, useState } from 'react'
import image1 from '../../Assets/1680402295928-cover.jpeg'
import style from './Cart.module.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CounterContext } from '../../Context/CounterContext'

export default function Cart() {
    let { setData: change } = useContext(CounterContext)
    let [Data, setData] = useState({})
    const [loading, setloading] = useState(false)
    async function getLoggedincart() {
        try {
            let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("userToken")
                }

            })
            setData(data)
        }
        catch (err) {
            console.log(err);
        }
    }
    async function deleteCart(id) {
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        toast(data)
        setData(data)
        console.log(data);
        change(data)
    }
    async function deleteallCart() {
        try {
            setloading(true)
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            })
            setData(data)
            setloading(false)
            change({})
        } catch (err) {
            console.log(err)
        }
    }
    async function updateCart(id, count) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                count
            }, {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            })
            setData(data)
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getLoggedincart()
        console.log("cart", Data);
    }, [])
    return <>
        {loading ? <div className="w-100 h-100 position-absolute top-0 start-0  d-flex justify-content-center align-items-center opacity-50 bg-black z-3">
            <span className="loader"></span>
        </div> : <>
            {Data.data?.products?.length > 0 ?
                <>
                    <div className="bg-light p-4">
                        <h2 className="fs-2 fw-light">your cart:</h2>
                        <p className="m-2 color-mine" >total price: {Data.data?.totalCartPrice}</p>
                        <div className="row">
                            {Data.data?.products?.map((item, index) => {
                                return <div key={index} className="col-12 d-flex justify-content-between align-content-center  border-bottom-1">
                                    <div className="item row">
                                        <div className="img col-2 mb-2">
                                            <img src={item.product.imageCover} className='w-100' />
                                        </div>
                                        <div className="info col-10 d-flex justify-content-center flex-column">
                                            <h3 className="fs-3 fw-light">{item.product.title}</h3>
                                            <p className='color-mine'>price: {item.price}</p>
                                            <button onClick={() => deleteCart(item.product._id)} className="btn align-self-start p-0"><i className="fa fa-trash color-mine"></i> Remove</button>
                                        </div>
                                    </div>
                                    <div className="counter d-flex align-content-center align-items-center">
                                        <button onClick={() => updateCart(item.product._id, item.count + 1)} className="btn border-main p-2 m-2">+</button>
                                        <span className="m-2 ">{item.count}</span>
                                        <button onClick={() => updateCart(item.product._id, item.count - 1)} className="btn border-main p-2 m-2">-</button>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button onClick={deleteallCart} className="btn btn-outline-danger p-2 m-2">clear cart</button>
                        <button className="btn btn-outline-success  p-2 m-2">checkout</button>
                    </div>
                </>
                : <h1 className='alert alert-warning text-center'>your cart is empty </h1>}
        </>}


    </>
}
