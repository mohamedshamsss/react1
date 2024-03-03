import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CounterContext = createContext()

export default function CounterContextProvider(props) {
    let [Data, setData] = useState({})
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
    useEffect(() => {
        getLoggedincart()
    }, [])
    return <CounterContext.Provider value={{Data,setData}}>
        {props.children}
    </CounterContext.Provider>
}