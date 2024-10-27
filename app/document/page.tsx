'use client'

import Image from 'next/image';
import docsIcon from '../../public/logo.svg';
import Rte from "@gds/app/ui/rte";
import {SetStateAction, useState} from "react";

export default function Page() {
    const initialDocumentContent = "<p>Welcome to your new document!</p>";
    const [savedContent, setSavedContent] = useState("");

    const handleSave = (content: SetStateAction<string>) => {
        console.log("Document content saved:", content);
        setSavedContent(content); // Here you can send it to a server or save locally
    };


    return (
        <>
            <header className="flex items-center p-2 border-b border-gray-200 bg-gray-50">
                {/* Logo Area */}
                <div className="flex items-center space-x-2">
                    <div>
                        <Image
                            priority
                            src={docsIcon}
                            height={36}
                            width={36}
                            alt="Google Docs icon"
                        />
                    </div>
                    <input
                        type="text"
                        defaultValue="Untitled Document"
                        className="text-xl font-normal focus:outline-none border-b border-transparent focus:border-gray-300"
                    />
                </div>

                {/* Menu Area */}
                <div className="flex-grow flex items-center justify-center space-x-6 text-sm text-gray-600">
                    <button className="hover:bg-gray-200 px-2 py-1 rounded">File</button>
                    <button className="hover:bg-gray-200 px-2 py-1 rounded">Edit</button>
                    <button className="hover:bg-gray-200 px-2 py-1 rounded">View</button>
                    <button className="hover:bg-gray-200 px-2 py-1 rounded">Insert</button>
                    <button className="hover:bg-gray-200 px-2 py-1 rounded">Format</button>
                    <button className="hover:bg-gray-200 px-2 py-1 rounded">Tools</button>
                    <button className="hover:bg-gray-200 px-2 py-1 rounded">Help</button>
                </div>

                {/* User Area */}
                <div className="flex items-center space-x-3">
                    <button className="text-blue-600 bg-blue-100 px-4 py-1 rounded-full hover:bg-blue-200">
                        Share
                    </button>
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
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
