# Steps followed

Dev branch created 1-JavierMR-interview-task as a way to isolate changes and allow safe integration into the main project.

1. Opened localhost which displayed the homepage of the app however error was thrown when clicking on View All Notes - from the terminal the error seems to point to services/noteService.ts (line 117) and it's a syntax error.

2. View All Notes functional, checked single notes and they show all their details.
3. Search functionality checked and it works with no issues.
4. When trying to create or edit one of the current notes I'm redirected to Homepage but edits or new notes are not saved.
   - Checked how creating and updating a note is handled. Went to noteServices.ts and found updateNote function with a comment explaining the bug, however changing POST for PUT in the method didn't fix the bug.
   - Checked NoteForm which seems to handle creating and updating notes. In line 51, variable data is declared but the value is never read (and this data is linked to updating and creating notes. Should this data be used/sent somewhere?)
   - Tried console logging data in updateNote (noteService.ts) which does not show any differences after submission (nor helps me clarify what the bug is). HOWEVER, chromeDevTools pointed at: 'A form field element should have an id or name attribute. A form field element has neither an id nor a name attribute. This might prevent the browser from correctly autofilling the form.'.
   - Checked Stack Overflow and GitHub forums to find info relevant to the above but this doesn't seem to be the issue for the POST / PUT bug.
   - I still think the issue must be in the form submission. I have checked the types for CreateNoteDto and UpdateNoteDto but everything seems ok.
   - I just realised that at the top of NoteForm.tsx there is another interface, NoteFormProps which contains onSubmit. This prop is being passed to the function NoteForm but its value is also never read.
   - I used onSubmit passing the data and this fixes both, the creating and updating a Note issues!!!!!!
5. Deleting comments works fine but there is no prevention or asking for confirmation (and while checking NoteItem.tsx I also spotted a BUG comment stating this issue).

## Issues

1. Syntax error when trying to access View All Notes from Homepage.
2. Editing notes does not save changes.
3. New notes created are not saved.
4. Comments are deleted without prompting the user whether they want to confirm the action.

## Fixes

1. noteService.ts was missing a closing curly brace, hence the Unexpected eof (end of file) message from terminal. Curly brace added in line 121.
   2 & 3 form in NoteForm.tsx was being submitted but was not setting the data for new Notes or updating Notes. Added onSubmit(data) in line 55 which fixes the issue.
2. window.confirm used in NoteItem.tsx line 31 to prompt user for confirmation

## Task own notes:

Familiarised myself with structure of app via folders (although this was perfectly documented in the README file). I found very interesting that there is no need for a separate back-end repository and that database and API services are all stored in the same repo with a .data folder and notes.json for the database and data manipulated via HTTP methods in the services/noteService.ts file (must have a look at Next.js API Routes docs).
Important files to check are noteActions.ts and noteService.ts.

- noteActions - Is this the middle point between the server/db and the front-end?
- noteService - Seems to be the equivalent to the api.js from a React project

Whilst working on Issues 2 and 3, even though I am a bit familiar with TypeScript I am struggling to see how the new data for a created note and the updated data is set via the form in NoteForm.tsx

For bug number 4, window.confirm used from own bootcamp project where I already implemented this when deleting comments from a news article.
