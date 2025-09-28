"use client";

import React, { useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { sdk } from "../lib/sdk"; // jouw Medusa SDK
import "./style.css";
import { Columns, Column } from "./Columns";

type Props = {
  value?: string;
  onChange?: (json: string, html: string) => void;
};

function safeParseContent(value?: string) {
  if (!value) return "";

  try {
    // Probeer eerst te parsen als JSON
    return JSON.parse(value);
  } catch {
    // Als dat faalt, ga er vanuit dat het HTML is
    return value;
  }
}

export default function TiptapEditor({ value = "", onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Columns,
      Column,
    ],
    content: safeParseContent(value), // ✅ vangt zowel HTML als JSON af
    onUpdate: ({ editor }) => {
      const json = JSON.stringify(editor.getJSON());
      const html = editor.getHTML();
      onChange?.(json, html);
    },
  });

  // Foto uploaden
  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !editor) return;

      try {
        const res = await sdk.admin.upload.create({ files: [file] });
        if (res.files && res.files[0].url) {
          editor.chain().focus().setImage({ src: res.files[0].url }).run();
        }
      } catch (err) {
        console.error("Upload failed", err);
      }
    },
    [editor]
  );

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-2 space-y-2">
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "font-bold" : ""}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "italic" : ""}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          P
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>

        {/* Tabellen */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
          }
        >
          Tabel
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          Rij +
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          Kolom +
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent(
                '<div class="columns"><div class="column"><p>Kolom 1</p></div><div class="column"><p>Kolom 2</p></div></div>'
              )
              .run()
          }
        >
          2 Kolommen
        </button>

        {/* Upload button */}
        <label className="cursor-pointer bg-gray-200 px-2 py-1 rounded">
          Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="my-custom-editor" />
    </div>
  );
}
