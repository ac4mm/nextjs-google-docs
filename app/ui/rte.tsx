import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {Bold} from "@tiptap/extension-bold";
import {Italic} from "@tiptap/extension-italic";
import {Heading} from "@tiptap/extension-heading";
import {useEffect} from "react";
import {Underline} from "@tiptap/extension-underline";

export default function Rte({ initialContent, onSave }){
    // Initialize the editor with initial content
    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Underline,
            Heading.configure({ levels: [1, 2, 3] }),
        ],
        content: initialContent,  // Setting initial content
    });

    useEffect(() => {
        if (editor && initialContent) {
            editor.commands.setContent(initialContent); // Update content when `initialContent` changes
        }
    }, [initialContent, editor]);

    // Save content to parent or external storage when needed
    const handleSave = () => {
        if (onSave && editor) {
            onSave(editor.getHTML());  // Retrieve and save the current content as HTML
        }
    };

    if (!editor) {
        return null;
    }

    return (
        <div className="p-4">
            {/* Toolbar */}
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
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    H3
                </button>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="border p-4 min-h-[400px] rounded bg-white shadow-sm" />

            {/* Save Button */}
            <div className="mt-4 flex justify-end">
                <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save
                </button>
            </div>
        </div>
    );
}
