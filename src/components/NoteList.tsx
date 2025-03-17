"use client";

import React from "react";
import { Note } from "@/models/Note";
import NoteItem from "./NoteItem";

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => Promise<void>;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded">
        <p className="text-gray-500">No notes found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
}
