import { storageService } from "../src/utils/storage";
import { CreateNoteDto, Note } from "@/models/Note";
import { createNote } from "@/actions/noteActions";

// Tests will be written using Arrange, Act, & Assert structure

// Firstly, I will ensure the create() function returns expected output
// This is to ensure created notes behave as expected for future tests
describe("StorageService - Create Note", () => {
  it("Should create a new note with correct properties / value types", async () => {
    //Arrange: Create note content using required fields
    const newNote: CreateNoteDto = {
      title: "Brand New Test Note",
      content: "This is a newly created test note.",
    };

    //Act: Create a new note using create()
    const createdNote: Note = await storageService.create(newNote);

    //Assert: Ensure the created note has the expected properties found in models interface (Note.ts)
    expect(createdNote).toHaveProperty("id");
    expect(typeof createdNote.id).toBe("string");
    //The title and content should be equal to the declared values above
    expect(createdNote).toHaveProperty("title", newNote.title);
    expect(createdNote).toHaveProperty("content", newNote.content);
    expect(createdNote).toHaveProperty("createdAt");
    expect(createdNote).toHaveProperty("updatedAt");
    expect(typeof createdNote.createdAt).toBe("string");
    expect(typeof createdNote.updatedAt).toBe("string");

    //Ensure createdAt and updatedAt are the same at creation
    expect(createdNote.createdAt).toBe(createdNote.updatedAt);
  });
});

// Test the corrected update function to ensure createdAt value stays the same
describe("StorageService - Update Note", () => {
  it("Should preserve createdAt when updating a note", async () => {
    // Arrange: Create a sample note for testing
    const sampleNote: Note = await storageService.create({
      title: "Original Note",
      content: "This is a test note.",
    });

    // Act: Update the note (should NOT modify createdAt)
    const updatedNote: Note | null = await storageService.update(sampleNote.id, {
      title: "Updated Title",
    });

    // Assert: createdAt should remain the same
    expect(updatedNote?.createdAt).toBe(sampleNote.createdAt);
  });
});

