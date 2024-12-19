import {useEffect, useState} from "react";
import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {Underline} from "@tiptap/extension-underline";
import {Socket} from "socket.io-client";

interface RteProps {
    initialContent: string;
    socket: Socket;
}

export const Rte: React.FC<RteProps> = ({ initialContent, socket }: RteProps)=> {
    // Initialize the editor with initial content
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline
        ],
        content: initialContent,
        immediatelyRender: false,
        onUpdate({ editor }) {
            socket.emit("sendMessage", {room: 'room1', message: editor.getText()})
        },
    });

    const [logs, setLogs] = useState([]);
    const [realTimeLogs, setRealTimeLogs] = useState([]);


    useEffect(() => {
        if (!editor) return;

        if (editor && initialContent) {
            editor.commands.setContent(initialContent); // Update content when `initialContent` changes
        }

        socket.on("message", (msg) => {
            editor.commands.setContent(msg);
        });

        socket.on('log-history', (logHistory) => {
            setLogs(logHistory);
        });

        socket.on('log-update', (message) => {
            setRealTimeLogs(addLogs);

            function addLogs(prev: string[]) {
                return [...prev, message];
            }
        });

    }, [initialContent, editor]);

    if (!editor) {
        return null
    }

    return (
        <div className="p-4 grid grid-cols-6 gap-4">
            {/* Toolbar */}
            <div className="col-span-5">
                <div className="flex space-x-2 mb-4">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`px-3 py-1 hover:bg-gray-200 rounded ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`px-3 py-1 rounded ${editor.isActive('underline') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Underline
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                        className={`px-3 py-1 rounded ${editor.isActive('heading', {level: 1}) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                        className={`px-3 py-1 rounded ${editor.isActive('heading', {level: 2}) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                        className={`px-3 py-1 rounded ${editor.isActive('heading', {level: 3}) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        H3
                    </button>
                </div>

                {/* Editor Content */}
                <EditorContent editor={editor} className="border p-4 w-9/12 h-96 xl:mx-auto rounded bg-white"/>
            </div>

            <div className="col-span-1">
                <h1 className="flex justify-center items-center space-x-2 mb-4">LOGGING</h1>
                <div className="border p-4 w-full h-96 xl:mx-auto rounded bg-neutral-700 text-slate-50">
                    {/*<p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero ante, mattis dapibus lacus quis, pretium ornare velit.</p>*/}
                    <p className="text-xs">
                        {realTimeLogs.map((log, index) => (
                            <ul key={index}>{log}</ul>
                        ))}
                    </p>
                    <pre>{logs.join('\n')}</pre>
                </div>
            </div>
        </div>
    );
}
