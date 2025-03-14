"use client";

import React, { useState, useEffect } from "react";
import { Note, CreateNoteDto, UpdateNoteDto } from "@/models/Note";
import { useRouter } from "next/navigation";

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
      onSubmit(data); // BUG #2 & #3 onSubmit and data were never used, onSubmit needed to interact with API and pass the data

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
    <form onSubmit={handleSubmit} className="space-y-6" id="form">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          name="input-title"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Note title"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <textarea
          name="input-content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Note content"
        ></textarea>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          name="input-submit"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          name="input-cancel"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded text-white ${
            isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Saving..." : isEdit ? "Update Note" : "Create Note"}
        </button>
      </div>
    </form>
  );
}
