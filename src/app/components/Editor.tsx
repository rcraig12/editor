"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Underline as UnderlineIcon,
  Quote,
  Undo,
  Redo,
  Code,
  Heading1,
} from "lucide-react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";

import './editor.css'

type ToolbarProps = {
  editor: Editor | null;
  content: string;
};

const Toolbar: React.FC<ToolbarProps> = ({ editor, content }) => {
  if (!editor) {
    return null;
  }

  const buttonClass = (isActive: boolean) =>
    isActive ? "bg-sky-700 text-white p-2 rounded-lg" : "text-sky-400";

  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={buttonClass(editor.isActive("bold"))}
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={buttonClass(editor.isActive("italic"))}
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={buttonClass(editor.isActive("underline"))}
        >
          <UnderlineIcon className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={buttonClass(editor.isActive("strike"))}
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={buttonClass(editor.isActive("heading", { level: 1 }))}
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={buttonClass(editor.isActive("heading", { level: 3 }))}
        >
          <Heading3 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className={buttonClass(editor.isActive("heading", { level: 4 }))}
        >
          <Heading4 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 5 }).run();
          }}
          className={buttonClass(editor.isActive("heading", { level: 5 }))}
        >
          <Heading5 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 6 }).run();
          }}
          className={buttonClass(editor.isActive("heading", { level: 6 }))}
        >
          <Heading6 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={buttonClass(editor.isActive("bulletList"))}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={buttonClass(editor.isActive("orderedList"))}
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={buttonClass(editor.isActive("blockquote"))}
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={buttonClass(editor.isActive("code"))}
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className="text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className="text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
      {content && (
        <button
          type="submit"
          className="px-4 bg-sky-700 text-white py-2 rounded-md"
        >
          Add
        </button>
      )}
    </div>
  );
};

type TiptapProps = {
  onChange: (newContent: string) => void; // Ensure this is typed as a function
  content: string;
};

const Tiptap: React.FC<TiptapProps> = ({ onChange, content }) => {
  const editor = useEditor({
    extensions: [StarterKit, UnderlineExtension],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none caret-gray-400",
      },
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      onChange(newContent); // Safely call the onChange function
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
