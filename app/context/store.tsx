'use client';

import {createContext, Dispatch, FC, SetStateAction, useContext, useState} from "react";
import {boolean} from "zod";

interface ContextProps {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    // room: string[];
    // setRoom: Dispatch<SetStateAction<string[]>>;
    // joined: boolean;
    // setJoined: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<ContextProps>({
    username: '',
    setUsername: () => '',
    // room: [],
    // setRoom: () => [],
    // joined: false,
    // setJoined: () => boolean,
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

