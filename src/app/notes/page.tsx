"use client";

import React, { useState, useEffect } from "react";
import { noteService } from "@/services/noteService";
import { Note } from "@/models/Note";
import Link from "next/link";
import NoteList from "@/components/NoteList";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load notes on component mount
    loadNotes();
  }, []);

  const loadNotes = async (search?: string) => {
    try {
      setLoading(true);
      const fetchedNotes = await noteService.getAllNotes(search);

      setNotes(fetchedNotes);
      setError(null);
    } catch (err) {
      console.error("Failed to load notes:", err);
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadNotes(searchTerm);
  };

  const handleDelete = async (id: string) => {
    try {
      await noteService.deleteNote(id);
      // Refresh the notes list after deletion
      loadNotes(searchTerm);
    } catch (err) {
      console.error(`Failed to delete note ${id}:`, err);
      setError("Failed to delete note. Please try again.");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Notes</h1>
        <Link
          href="/notes/new"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Create New Note
        </Link>
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
          >
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading notes...</div>
      ) : notes.length > 0 ? (
        <NoteList notes={notes} onDelete={handleDelete} />
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded">
          <p className="text-gray-500">No notes found.</p>
          <Link
            href="/notes/new"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            Create your first note
          </Link>
        </div>
      )}
    </div>
  );
}
