"use client"

import React, {Suspense, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {robotoMono} from '@gds/app/ui/fonts';
import {useGlobalContext} from "@gds/app/context/store";
import Loading from "@gds/app/loading";
import {socket} from "@gds/socket";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const router = useRouter();
    const {username, setUsername}= useGlobalContext();

    const [room, setRoom] = useState("default"); // Default room for all tabs
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    async function onSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        if (socket.connected) {
            // onConnect(username);

            // Join the room
            // socket.emit("joinRoom", room);

            // socket.emit("username", username);
        }

        // router.push('/document');
    }

    const sendMessage = () => {
        if (message) {
            // Send the message to the server
            socket.emit("sendMessage", { room, message });

            // Add the message to local state
            setMessages((prevMessages) => [...prevMessages, message]);
            setMessage("");
        }
    };

    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");

    function onConnect(usernameInput?: string) {
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);

        const username = usernameInput ? usernameInput : uuidv4();
        // console.log(`User ${username} connected`);

        socket.io.engine.on("upgrade", (transport) => {
            setTransport(transport.name);
        });
    }

    function onDisconnect() {
        setIsConnected(false);
        setTransport("N/A");
    }

    useEffect(() => {
        return () => {
            // socket.off("connect", onConnect);
            // socket.off("disconnect", onDisconnect);
        };
    }, []);


    useEffect(() => {
        // Join the room
        socket.emit("joinRoom", room);

        // Listen for messages
        socket.on("message", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.disconnect();
        };
    }, [room]);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <Suspense fallback={<Loading/>}>
                    {/*Logo and Text*/}
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Google Docs"
                            src="https://upload.wikimedia.org/wikipedia/commons/6/66/Google_Docs_2020_Logo.svg?color=indigo&shade=600"
                            className="mx-auto h-16 w-auto"
                        />
                        <h2
                            className={`${robotoMono.className} regular mt-6 mb-6 text-center text-3xl font-semibold leading-9 tracking-tight text-white-900`}>
                            Google Docs
                        </h2>
                    </div>

                    {/*Form*/}
                    <div className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" className="space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="username"
                                       className="block text-sm font-medium leading-6 text-white-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        required
                                        autoComplete="username"
                                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onInput={(e) => setUsername((e.target as HTMLInputElement)?.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Join
                                </button>
                            </div>

                            {/* <Chat />*/}
                        </form>
                    </div>
                </Suspense>

                <div>
                    <p>Status: {isConnected ? "connected" : "disconnected"}</p>
                    <p>Transport: {transport}</p>
                </div>

                <div>
                    <h1>Multi-Tab Chat</h1>
                    <h2>Room: {room}</h2>

                    <input
                        type="text"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send Message</button>

                    <div>
                        <h2>Messages:</h2>
                        <ul>
                            {messages.map((msg, idx) => (
                                <li key={idx}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
