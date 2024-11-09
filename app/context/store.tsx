'use client';

import {createContext, Dispatch, FC, SetStateAction, useContext, useState} from "react";

interface ContextProps {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<ContextProps>({
    username: '',
    setUsername: () => ''
})

export const GlobalContextProvider: FC<any> = ( ({children}) => {
    const [username, setUsername] = useState('');

    return (
        <GlobalContext.Provider value={{username, setUsername}}>
            {children}
        </GlobalContext.Provider>
    )
})

export const useGlobalContext = () => useContext(GlobalContext);

