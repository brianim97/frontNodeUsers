import { useState, createContext } from 'react';

export const LoginContext = createContext();

const isLogged = ()=>{
    if(localStorage.getItem('token')){
        return true;
    }
}
export const LoginProvider = ({children})=>{
    
    const [logged, setLogged] = useState(isLogged());

    return(
        <LoginContext.Provider value={{
            logged,
            setLogged  
        }}>
            {children}
        </LoginContext.Provider>
    )
}
