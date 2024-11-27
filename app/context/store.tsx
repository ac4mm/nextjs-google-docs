'use client';

import {createContext, Dispatch, FC, SetStateAction, useContext, useState} from "react";

interface ContextProps {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<ContextProps>({
    username: '',
    setUsername: () => '',
})

export const GlobalContextProvider: FC<never> = ( ({children}) => {
    const [username, setUsername] = useState('');
    // const [room, setRoom] = useState([]);
    // const [joined, setJoined] = useState(false);

    return (
        <GlobalContext.Provider value={{username, setUsername}}>
                {children}
        </GlobalContext.Provider>
    )
})

export const useGlobalContext = () => useContext(GlobalContext);

