import Image from 'next/image';
import docsIcon from '../../public/logo.svg';

export default function Page() {
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
        </>
    )
}
