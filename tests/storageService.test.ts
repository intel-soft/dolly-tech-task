import { storageService } from "../src/utils/storage";
import { CreateNoteDto, Note, UpdateNoteDto } from "@/models/Note";
import { noteService } from "../src/services/noteService";

// Mock the storageService methods to avoid directly interacting with the API
jest.mock("../src/utils/storage", () => ({
  storageService: {
    create: jest.fn(),
    update: jest.fn(),
  },
}));

describe("StorageService - Create Note", () => {
  it("Should create a new note with correct properties / value types", async () => {
    const newNote: CreateNoteDto = {
      title: "Brand New Test Note",
      content: "This is a newly created test note.",
    };

    // Arrange: Mock the create function to return a simulated response
    const mockNote: Note = {
      id: "12345",
      title: newNote.title,
      content: newNote.content,
      createdAt: "2025-03-18T10:00:00Z",
      updatedAt: "2025-03-18T10:00:00Z",
    };
    (storageService.create as jest.Mock).mockResolvedValue(mockNote);

    // Act: Call the create function
    const createdNote: Note = await storageService.create(newNote);

    // Assert: Ensure the created note has the expected properties and behavior
    expect(createdNote).toHaveProperty("id");
    expect(createdNote.id).toBe("12345");
    expect(createdNote).toHaveProperty("title", newNote.title);
    expect(createdNote).toHaveProperty("content", newNote.content);
    expect(createdNote).toHaveProperty("createdAt");
    expect(createdNote).toHaveProperty("updatedAt");
    expect(createdNote.createdAt).toBe(createdNote.updatedAt);
  });
});

describe("StorageService - Update Note", () => {
  it("Should preserve createdAt when updating a note", async () => {
    // Arrange: Create a sample note for testing
    const sampleNote: Note = {
      id: "12345",
      title: "Original Note",
      content: "This is a test note.",
      createdAt: "2025-03-18T10:00:00Z",
      updatedAt: "2025-03-18T10:00:00Z",
    };

    // Mock the update function to return an updated note
    const updatedNote: Note = {
      ...sampleNote,
      title: "Updated Title",
      updatedAt: "2025-03-18T11:00:00Z", // Updated at should change
    };
    (storageService.update as jest.Mock).mockResolvedValue(updatedNote);

    // Act: Call the update function
    const result: Note | null = await storageService.update(sampleNote.id, {
      title: "Updated Title",
    });

    // Assert: createdAt should remain the same after the update
    expect(result?.createdAt).toBe(sampleNote.createdAt);
    expect(result?.updatedAt).not.toBe(sampleNote.updatedAt); // updatedAt should change
  });
});

global.fetch = jest.fn();

describe("noteService - Update Note", () => {
  it("Should update the existing note with additional content", async () => {
    // Arrange: Create a sample note for testing
    const sampleNote: Note = {
      id: "12345",
      title: "Original Note",
      content: "This is a test note.",
      createdAt: "2025-03-18T10:00:00Z",
      updatedAt: "2025-03-18T10:00:00Z",
    };

    // Mock the updated note we want after we run the update operation
    const updatedNote: Note = {
      ...sampleNote,
      title: "Updated Title",
      content: "This is a test note with updated content.",
      updatedAt: "2025-03-18T11:00:00Z",
    };

    // Mock the response from the fetch call
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, data: updatedNote }),
    });

    // Act: Call the updateNote function
    const result: Note | null = await noteService.updateNote(sampleNote.id, {
      title: "Updated Title",
      content: "This is a test note with updated content.",
    });

    // Assert: Ensure the result matches the updated note
    expect(result).toEqual(updatedNote);
    expect(result?.createdAt).toBe(sampleNote.createdAt); // createdAt should remain the same
    expect(result?.updatedAt).not.toBe(sampleNote.updatedAt); // updatedAt should change

    // Check that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(`/api/notes/${sampleNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Updated Title",
        content: "This is a test note with updated content.",
      }),
    });
  });
});
