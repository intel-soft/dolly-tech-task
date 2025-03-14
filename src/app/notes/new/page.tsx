"use client";

import React from "react";
import NoteForm from "@/components/NoteForm";
import { noteService } from "@/services/noteService";
import { CreateNoteDto, UpdateNoteDto } from "@/models/Note";

export default function NewNotePage() {
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (data: CreateNoteDto | UpdateNoteDto) => {
    try {
      await noteService.createNote(data as CreateNoteDto);
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Failed to create note");
      throw err; // Re-throw to let the form component handle the error state
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Note</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 dark:bg-slate-900  dark:text-neutral-100">
        <NoteForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
