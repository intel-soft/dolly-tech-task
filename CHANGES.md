# Steps followed

Dev branch created 1-JavierMR-interview-task as a way to isolate changes and allow safe integration into the main project.

1. Opened localhost which displayed the homepage of the app however error was thrown when clicking on View All Notes - from the terminal the error seems to point to services/noteService.ts (line 117) and it's a syntax error.

2. View All Notes functional, checked single notes and they show all their details.
3. Search functionality checked and it works with no issues.
4. When trying to create or edit one of the current notes I'm redirected to Homepage but edits or new notes are not saved.
   - Checked how creating and updating a note is handled. Went to noteServices.ts and found updateNote function with a comment explaining the bug, however changing POST for PUT in the method didn't fix the bug.
   - Checked NoteForm which seems to handle creating and updating notes. In line 51, variable data is declared but the value is never read (and this data is linked to updating and creating notes. Should this data be used/sent somewhere?)
   - Tried console logging data in updateNote which does not show any differences after submission. HOWEVER, chromeDevTools pointed at: 'A form field element should have an id or name attribute. A form field element has neither an id nor a name attribute. This might prevent the browser from correctly autofilling the form.'.
   - Checked Stack Overflow and GitHub forums to find info relevant to the above but it doesn't seem to be the issue for the POST / PUT bug.

## Issues

1. Syntax error when trying to access View All Notes from Homepage.
2. Editing notes does not save changes.
3. New notes created are not saved.

## Fixes

1. noteService.ts was missing a closing curly brace, hence the Unexpected eof (end of file) message from terminal. Curly brace added in line 121.

## Task own notes:

Familiarised myself with structure of app via folders (although this was perfectly documented in the README file). I found very interesting that there is no need for a separate back-end repository and that database and API services are all stored in the same repo with a .data folder and notes.json for the database and data manipulated via HTTP methods in the services/noteService.ts file (must have a look at Next.js API Routes docs).
Important files to check are noteActions.ts and noteService.ts.

- noteActions - Is this the middle point between the server/db and the front-end?
- noteService - Seems to be the equivalent to the api.js from a React project

Whilst working on Issues 2 and 3, even though I am a bit familiar with TypeScript I am struggling to see how the new data for a created note and the updated data is set via the form in NoteForm.tsx
