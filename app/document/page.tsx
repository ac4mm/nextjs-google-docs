'use client'

import Image from 'next/image';
import docsIcon from '../../public/logo.svg';
import Rte from "@gds/app/ui/rte";
import React, {SetStateAction, useState} from "react";
import {AccountIcon} from "@gds/app/ui/account-icon";

export default function Page() {
    const initialDocumentContent = "<p>Welcome to your new document!</p>";
    const [savedContent, setSavedContent] = useState("");

    const handleSave = (content: SetStateAction<string>) => {
        console.log("Document content saved:", content);
        setSavedContent(content); // Here you can send it to a server or save locally
    };

    const [components, setComponents] = useState([]);

    const addComponent = () => {
        setComponents((prevComponents) => {
            return [
                ...prevComponents,
                <AccountIcon key={prevComponents.length} index={prevComponents.length + 1}/>
            ];
        });
    };


    return (
        <>
            <header className="flex items-center p-2 border-b border-gray-200 bg-gray-50">

                {/* Logo and Menu Area */}
                <div className="flex flex-col space-y-1 flex-grow">
                    {/* Logo Area */}
                    <div className="flex items-center space-x-2 flex-grow">
                        <button className="hover:bg-gray-200 px-2 py-1 rounded-full">
                            <Image
                                priority
                                src={docsIcon}
                                style={{width: "36px", height: "36px"}}
                                alt="Google Docs icon"
                            />
                        </button>

                    <input
                        type="text"
                            defaultValue="Untitled Document"
                            className="text-xl font-normal focus:outline-none border-b border-transparent focus:border-gray-300 pl-1"
                        />
                    </div>

                    {/* Menu Area */}
                    <div className="flex-grow flex items-center justify-start space-x-1 text-sm text-gray-600 pl-14">
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
                    <button onClick={addComponent}>Add Component</button>
                    {components}

                    <AccountIcon firstLetterName="B"/>

                    <button className="text-blue-600 bg-blue-100 px-4 py-1 rounded-full hover:bg-blue-200">
                        Share
                    </button>
                    {/*Profile user*/}
                    <AccountIcon firstLetterName="A"/>
                </div>
            </header>

            {/*RTE*/}
            <div className="min-h-screen p-6 bg-gray-100">
                <Rte initialContent={initialDocumentContent} onSave={handleSave}/>
                {savedContent && (
                    <div className="mt-6 p-4 border rounded bg-gray-50">
                        <h2 className="text-lg font-semibold">Saved Content:</h2>
                        <div dangerouslySetInnerHTML={{__html: savedContent}}/>
                    </div>
                )}
            </div>
        </>
    )
}
