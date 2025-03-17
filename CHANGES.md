# Note Taking App Technical Assessment

## Bug Fixes

### 1. Application crashed when clicking Create New Note

File location: /src/services/noteService.ts

#### steps taken:

- Changed HTTP method from POST to PUT
- Closed noteService with curly bracket '}'

### 2. New Notes not saved and existing notes not updated

File location: /src/components/NoteForm.tsx

#### steps taken:

- Imported createNote and updateNote from noteServices.ts
- Passed note data to updateNote if isEdit, otherwise passed to createNote

### 3. Edited notes updating createdAt to current time

File location: /src/utils/storage.ts

#### steps taken:

- Changed createdAt: new Date().toISOString() to createdAt: notes[noteIndex].createdAt to preserve original createdAt

### 4. Notes deleted without confirmation

File location: /src/components/noteItem.tsx

#### steps taken:

- Added useState confirmDelete
- Added conditional logic to Delete button to change text to "Confirm Delete" if confirmDelete is true
- Added timeout (3 seconds) to wait and revert confirmDelete back to false if not clicked a second time

## Implementing Dark Mode

### Steps Taken

- Added darkMode: 'media' to tailwind.config
- Inline Tailwind CSS altered to include lightmode (as standard) background colors and foreground (text) colors
- dark: used to style for background color and foreground color when dark mode selected
