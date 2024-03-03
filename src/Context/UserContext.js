import { createContext, useState } from "react";

export let CounterUserContext = createContext()
export default function CounterUserContextProvider(props){
    const [UserToken, setUserToken] = useState(null)
    return <CounterUserContext.Provider value={{UserToken,setUserToken}}>
        {props.children}
    </CounterUserContext.Provider>
}