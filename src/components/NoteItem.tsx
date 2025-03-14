"use client";

import React from "react";
import { Note } from "@/models/Note";
import Link from "next/link";

interface NoteItemProps {
  note: Note;
  onDelete?: (id: string) => Promise<void>;
}

export default function NoteItem({ note, onDelete }: NoteItemProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Handle note deletion
  const handleDelete = async () => {
    if (!onDelete) return;

    // BUG #3: Missing state handling - deleting without confirming
    try {
      setIsDeleting(true);
      await onDelete(note.id);
    } catch (error) {
      console.error("Error deleting note:", error);
      setIsDeleting(false);
    }
  };

  // Truncate content if too long
  const truncateContent = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded shadow p-4 h-full flex flex-col">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
        <p className="text-gray-600 dark:text-neutral-300 mb-4 text-sm">
          {formatDate(note.updatedAt)}
        </p>
        <p className="text-gray-800 dark:dark:text-neutral-200 mb-4">
          {truncateContent(note.content)}
        </p>
      </div>

      <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
        <Link
          href={`/notes/${note.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          View Details
        </Link>

        {onDelete && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`text-red-600 hover:text-red-800 ${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
}
