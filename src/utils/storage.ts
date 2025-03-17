import { Note, CreateNoteDto, UpdateNoteDto } from "@/models/Note";
import { v4 as uuidv4 } from "uuid";
import { promises as fsPromises } from "fs";
import path from "path";

// File-based storage service for server components
class StorageService {
  private readonly DATA_DIR = path.join(process.cwd(), ".data");
  private readonly NOTES_FILE = path.join(process.cwd(), ".data", "notes.json");

  constructor() {
    // We'll ensure data dir exists before each operation
  }

  // Ensure data directory exists
  private async ensureDataDir(): Promise<void> {
    try {
      try {
        await fsPromises.access(this.DATA_DIR);
      } catch {
        await fsPromises.mkdir(this.DATA_DIR, { recursive: true });
      }

      try {
        await fsPromises.access(this.NOTES_FILE);
      } catch {
        await fsPromises.writeFile(this.NOTES_FILE, JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error initializing data directory:", error);
    }
  }

  // Helper method to get all notes
  private async getAll(): Promise<Note[]> {
    try {
      await this.ensureDataDir();
      const data = await fsPromises.readFile(this.NOTES_FILE, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading notes from file:", error);
      return [];
    }
  }

  // Helper method to save all notes
  private async saveAll(notes: Note[]): Promise<void> {
    try {
      await this.ensureDataDir();
      await fsPromises.writeFile(
        this.NOTES_FILE,
        JSON.stringify(notes, null, 2)
      );
    } catch (error) {
      console.error("Error saving notes to file:", error);
      throw new Error("Failed to save data to storage");
    }
  }

  // Get all notes with optional filtering
  public async findAll(search?: string): Promise<Note[]> {
    try {
      const notes = await this.getAll();

      if (!search) {
        return notes.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }

      const lowerCaseSearch = search.toLowerCase();
      return notes
        .filter(
          (note) =>
            note.title.toLowerCase().includes(lowerCaseSearch) ||
            note.content.toLowerCase().includes(lowerCaseSearch)
        )
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    } catch (error) {
      console.error("Error finding notes:", error);
      throw new Error("Failed to retrieve notes");
    }
  }

  // Get a single note by id
  public async findById(id: string): Promise<Note | null> {
    if (!id) {
      throw new Error("Note ID is required");
    }

    try {
      const notes = await this.getAll();
      return notes.find((note) => note.id === id) || null;
    } catch (error) {
      console.error(`Error finding note with ID ${id}:`, error);
      throw new Error("Failed to retrieve note");
    }
  }

  // Create a new note
  public async create(createNoteDto: CreateNoteDto): Promise<Note> {
    if (!createNoteDto.title || !createNoteDto.content) {
      throw new Error("Title and content are required");
    }

    try {
      const notes = await this.getAll();
      const now = new Date().toISOString();

      const newNote: Note = {
        id: uuidv4(),
        ...createNoteDto,
        createdAt: now,
        updatedAt: now,
      };

      notes.push(newNote);
      await this.saveAll(notes);

      return newNote;
    } catch (error) {
      console.error("Error creating note:", error);
      throw new Error("Failed to create note");
    }
  }

  // Update an existing note
  public async update(
    id: string,
    updateNoteDto: UpdateNoteDto
  ): Promise<Note | null> {
    if (!id) {
      throw new Error("Note ID is required");
    }

    if (!updateNoteDto.title && !updateNoteDto.content) {
      throw new Error(
        "At least one field (title or content) must be provided for update"
      );
    }

    try {
      const notes = await this.getAll();
      const noteIndex = notes.findIndex((note) => note.id === id);

      if (noteIndex === -1) {
        return null;
      }

      // BUG #2: Not preserving the createdAt date during updates
      const updatedNote: Note = {
        ...notes[noteIndex],
        ...updateNoteDto,
        createdAt: notes[noteIndex].createdAt, // This should preserve the original createdAt date
        updatedAt: new Date().toISOString(),
      };

      notes[noteIndex] = updatedNote;
      await this.saveAll(notes);

      return updatedNote;
    } catch (error) {
      console.error(`Error updating note with ID ${id}:`, error);
      throw new Error("Failed to update note");
    }
  }

  // Delete a note
  public async delete(id: string): Promise<boolean> {
    if (!id) {
      throw new Error("Note ID is required");
    }

    try {
      const notes = await this.getAll();
      const filteredNotes = notes.filter((note) => note.id !== id);

      if (filteredNotes.length === notes.length) {
        return false; // Note not found
      }

      await this.saveAll(filteredNotes);
      return true;
    } catch (error) {
      console.error(`Error deleting note with ID ${id}:`, error);
      throw new Error("Failed to delete note");
    }
  }

  // Initialize with sample data if empty
  public async initializeWithSampleData(): Promise<void> {
    try {
      const notes = await this.getAll();

      if (notes.length === 0) {
        const now = new Date().toISOString();
        const sampleNotes: Note[] = [
          {
            id: uuidv4(),
            title: "Welcome to the Notes App",
            content:
              "This is a sample note to get you started. You can edit or delete this note, or create new ones.",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            title: "TypeScript Tips",
            content:
              "Remember to define interfaces for your data models and use them consistently throughout your application.",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            title: "Next.js App Router",
            content:
              "The App Router is a new paradigm for building applications with Next.js. It includes features like server components, nested routing, and more.",
            createdAt: now,
            updatedAt: now,
          },
        ];

        await this.saveAll(sampleNotes);
      }
    } catch (error) {
      console.error("Error initializing sample data:", error);
    }
  }

  // Clear all data (useful for testing)
  public async clearAll(): Promise<void> {
    try {
      await this.saveAll([]);
    } catch (error) {
      console.error("Error clearing data:", error);
      throw new Error("Failed to clear data");
    }
  }
}

// Export as singleton
export const storageService = new StorageService();
