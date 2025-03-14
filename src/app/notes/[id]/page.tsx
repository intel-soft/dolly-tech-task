"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { noteService } from "@/services/noteService";
import { Note, UpdateNoteDto } from "@/models/Note";
import NoteForm from "@/components/NoteForm";
import Link from "next/link";

export default function NotePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch note data
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const fetchedNote = await noteService.getNoteById(id);
        setNote(fetchedNote);
      } catch (err) {
        console.error(`Error fetching note ${id}:`, err);
        setError(
          "Failed to load note. It may have been deleted or you have entered an invalid URL."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Handle note deletion
  const handleDelete = async () => {
    if (!note) return;

    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await noteService.deleteNote(note.id);
        router.push("/notes");
        router.refresh();
      } catch (err) {
        console.error(`Error deleting note ${id}:`, err);
        setError("Failed to delete note. Please try again.");
      }
    }
  };

  // Handle note update
  const handleUpdate = async (data: UpdateNoteDto) => {
    try {
      const updatedNote = await noteService.updateNote(id, data);
      setNote(updatedNote);
      setIsEditing(false);
    } catch (err) {
      console.error(`Error updating note ${id}:`, err);
      setError("Failed to update note. Please try again.");
      throw err;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return <div className="text-center py-8">Loading note...</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Link href="/notes" className="text-blue-600 hover:underline">
          Back to Notes
        </Link>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <p className="text-gray-500 mb-4">Note not found</p>
        <Link href="/notes" className="text-blue-600 hover:underline">
          Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {isEditing ? (
        <>
          <h1 className="text-2xl font-bold mb-6">Edit Note</h1>
          <div className="bg-white shadow rounded-lg p-6 dark:bg-slate-900">
            <NoteForm note={note} onSubmit={handleUpdate} isEdit={true} />
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{note.title}</h1>
            <div className="space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded "
              >
                Delete
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 dark:bg-slate-900">
            <div className="text-sm text-gray-500 mb-4 dark:text-neutral-300">
              <p>Created: {formatDate(note.createdAt)}</p>
              <p>Last updated: {formatDate(note.updatedAt)}</p>
            </div>

            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{note.content}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link href="/notes" className="text-blue-600 hover:underline">
                Back to Notes
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
