"use client";

import React, { useState, useEffect } from "react";
import { Note, CreateNoteDto, UpdateNoteDto } from "@/models/Note";
import { useRouter } from "next/navigation";
import { createNote, updateNote } from "@/actions/noteActions";

interface NoteFormProps {
  note?: Note;
  onSubmit: (data: CreateNoteDto | UpdateNoteDto) => Promise<void>;
  isEdit?: boolean;
}

export default function NoteForm({
  note,
  onSubmit,
  isEdit = false,
}: NoteFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set initial form values if editing
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Prepare data for submission
      const data: CreateNoteDto | UpdateNoteDto = {
        title: title.trim(),
        content: content.trim(),
      };
      console.log(data);

      if (isEdit && note) {
        await updateNote(note.id, data);
      } else {
        await createNote(data as CreateNoteDto);
      }

      // Redirect to notes list after successful submission
      router.push("/notes");
      router.refresh();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to save note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-backgroundLight dark:bg-backgroundDark"
          placeholder="Note title"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-backgroundLight dark:bg-backgroundDark"
          placeholder="Note content"
        ></textarea>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 dark:hover:text-gray-900 bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded text-white  ${
            isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Saving..." : isEdit ? "Update Note" : "Create Note"}
        </button>
      </div>
    </form>
  );
}
