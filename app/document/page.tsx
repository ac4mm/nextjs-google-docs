'use client'

import Image from 'next/image';
import docsIcon from '../../public/Google_Docs_2020_Logo.svg';
import {Rte} from "@gds/app/ui/rte";
import React, {SetStateAction, Suspense, useEffect, useState} from "react";
import {AccountIcon} from "@gds/app/ui/account-icon";
import {useGlobalContext} from "@gds/app/context/store";
import Loading from "@gds/app/document/loading";
import {useRouter} from "next/navigation";
import {socket} from "@gds/socket";

export default function Page() {
    const initialDocumentContent = "Welcome to your new document!";
    const [savedContent, setSavedContent] = useState("");
    const router = useRouter();

    const handleSave = (content: SetStateAction<string>) => {
        console.log("Document content saved:", content);
        setSavedContent(content); // Here you can send it to a server or save locally
    };

    const [components, setComponents] = useState<React.ReactNode[]>([]);

    const addComponent = (socketId: string, letter: string) => {
        setComponents((prevComponents) => [
            ...prevComponents,
            {
                socketId,
                component: <AccountIcon key={socketId} firstLetterName={letter} />,
            },
        ]);
    };

    const removeComponent = (socketId: string) => {
        setComponents((prevComponents) => prevComponents.filter((comp) => comp.socketId !== socketId));
    };

    //Ge username and set first letter
    const {username, setUsername}= useGlobalContext();
    const [room, setRoom] = useState("room1"); // Default room for all tabs
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.emit("userJoinRoom", {username, room});

        // Get users in a room
        socket.emit('getUsersInRoom', 'room1', (usersRoom) => {
            usersRoom.forEach((user) => {
                addComponent(user.socketId, user.firstCapitalLetter);
            });
        });

        // Listen for state updates from the server
        socket.on("stateUpdated", (data) => {
            console.log("State updated from server:", data);

            // Sync other tabs
            if(data?.firstCapitalLetter && data?.firstCapitalLetter !== ''){
                addComponent(data.socketId, data.firstCapitalLetter);
            }
        });

        // Listen for updates to room users
        socket.on('roomUsers', (updatedUsers) => {
            setUsers(updatedUsers);
            console.log("from roomUsers:", updatedUsers);


            // Update components to match the new user list
            const updatedUserIds = updatedUsers.map((user) => user.socketId);

            components.forEach(({ socketId }) => {
                if (!updatedUserIds.includes(socketId)) {
                    removeComponent(socketId); // Remove components for users no longer in the room
                }
            });
        });

        socket.on('userLeaveRoom', (userLeaveRoom) => {
            console.log(userLeaveRoom);
            removeComponent(userLeaveRoom.socketId)
        })


        //Redirect to first page, when refresh page
        if (username === "") {
            router.push('/');
        }

        // Handle user disconnection
        socket.on("disconnect", () => {
            removeComponent(socket.id);
        });

        return () => {
            // socket.disconnect();
            socket.off("stateUpdated");
            socket.off("roomUsers");
            socket.off("userLeaveRoom");
            socket.off("disconnect");
        };
    }, [room, username]);


    return (
        <>
            <Suspense fallback={<Loading/>}>
                {/*Header*/}
                <header className="flex items-center p-2 border-b border-gray-200 bg-gray-50">

                    {/* Logo and Menu Area */}
                    <div className="flex flex-col space-y-1 flex-grow">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 flex-grow">
                            <button className="hover:bg-gray-200 px-2 py-1 rounded-full">
                                <Image
                                    priority
                                    src={docsIcon}
                                    style={{width: "44px", height: "44px"}}
                                    alt="Google Docs icon"
                                />
                            </button>

                            <input
                                type="text"
                                defaultValue="Untitled Document"
                                className="text-xl font-normal focus:outline-none border-b border-transparent focus:border-gray-300 pl-1"
                            />
                        </div>

                        {/* Menu */}
                        <div
                            className="flex-grow flex items-center justify-start space-x-1 text-sm text-gray-600 pl-14">
                            <button className="hover:bg-gray-200 px-2 py-1 rounded">File</button>
                            <button className="hover:bg-gray-200 px-2 py-1 rounded">Edit</button>
                            <button className="hover:bg-gray-200 px-2 py-1 rounded">View</button>
                            <button className="hover:bg-gray-200 px-2 py-1 rounded">Insert</button>
                            <button className="hover:bg-gray-200 px-2 py-1 rounded">Format</button>
                            <button className="hover:bg-gray-200 px-2 py-1 rounded">Tools</button>
                            <button className="hover:bg-gray-200 px-2 py-1 rounded">Help</button>
                        </div>
                    </div>

                    {/* User Area */}
                    <div className="flex items-center space-x-2 justify-end	mx-4">

                        {/*Testing dynamic component*/}
                        {/*<button onClick={addComponent}>Add Component</button>*/}

                        {/*AccountIcon users*/}
                        {components.map(({ component }) => component)}

                        <h2>Active Users:</h2>
                        <ul>
                            {users.map((user) => (
                                <li key={user.socketId}>{user.username}</li>
                            ))}
                        </ul>

                        {/*currentUser: {username}*/}
                        <button
                            className="w-24 h-10 text-blue-600 bg-blue-100 px-4 py-1 rounded-full hover:bg-blue-200">
                            Share
                        </button>
                    </div>
                </header>

                {/*Content with RTE*/}
                <div className="p-6 bg-gray-100">
                    <Rte initialContent={initialDocumentContent} onSave={handleSave} socket={socket}/>
                    {savedContent && (
                        <div className="mt-6 p-4 border rounded bg-gray-50">
                            <h2 className="text-lg font-semibold">Saved Content:</h2>
                            <div dangerouslySetInnerHTML={{__html: savedContent}}/>
                        </div>
                    )}
                </div>
            </Suspense>

        </>
    )
}
