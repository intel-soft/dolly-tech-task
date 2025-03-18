## Issues

1. Syntax error when trying to access View All Notes from Homepage.
2. Editing notes does not save changes.
3. New notes created are not saved.
4. Comments are deleted without prompting the user whether they want to confirm the action and useState handling is missing.
5. Editing notes rewrites the created at stamp.

## Fixes

Issue 1. noteService.ts was missing a closing curly brace, hence the Unexpected eof (end of file) message from terminal. Curly brace added in line 121.
Issue 2. form in NoteForm.tsx was being submitted but was not setting the data for new Notes or updating Notes. Added onSubmit(data) in line 55 which fixes the issue.
Issue 3. Same fix as above
Issue 4. window.confirm used in NoteItem.tsx line 31 to prompt user for confirmation and finally block added to handle state.
Issue 5. time stamp for createdAt adjusted to keep showing original.

---

## Steps followed

### Day 1

Dev branch created as a way to isolate changes and allow safe integration into the main project.

1. Opened localhost which displayed the homepage of the app however error was thrown when clicking on View All Notes - from the terminal the error seems to point to services/noteService.ts (line 117) and it's a syntax error.
2. View All Notes functional after fix, checked single notes and they show all their details.
3. Search functionality checked and it works with no issues.
4. When trying to create or edit one of the current notes I'm redirected to Homepage but edits or new notes are not saved.
   - Checked how creating and updating a note is handled. Went to noteServices.ts and found updateNote function with a comment explaining the bug, however changing POST for PUT in the method didn't fix the bug.
   - Checked NoteForm which seems to handle creating and updating notes. In line 51, variable data is declared but the value is never read (and this data is linked to updating and creating notes. Should this data be used/sent somewhere?)
   - Tried console logging data in noteService.ts to help me clarify what the bug is. ChromeDevTools pointed at: 'A form field element should have an id or name attribute. This might prevent the browser from correctly autofilling the form' but upon checking Stack Overflow and GitHub forums I couldn't find a plausible answer.
   - I still think the issue must be in the form submission. I just realised that at the top of NoteForm.tsx there is another interface, NoteFormProps which contains onSubmit. This prop is being passed to the function NoteForm but its value is also never read.
   - I used onSubmit passing the data and this fixes both, the creating and updating a Note issues!!
5. Deleting comments works fine but there is no prevention or asking for confirmation (and while checking NoteItem.tsx I also spotted a BUG comment stating this issue).
6. Starting to implement mode toggle. tailwind.config.ts edited to add darkMode selector to be able to toggle mode manually. ThemeToggle.tsx from own portfolio included as it's been proven to work (and it uses TypeScript).
7. Toggle switch nested in Navigation for ease of use, however all components have specified classes for background and font colour making the toggle erratic. Tailwind has a dark variant that allows styling when dark mode is enabled (with the class prefix dark:). I checked and decided to change which components would need to be responsive to the theme toggle.
8. The created time stamp is changed when updating a Note, which should not be the case. Bug fixed by accessing and displaying the original property rather than creating a new date.

### Day 2

Dev branch created for today's purpose: Small UI change to homepage, using Tailwind to improve responsiveness & using Lighthouse to check Accessibility mainly.

1. The app is fully functional at this stage with no more bugs encountered and with a Toggle mode fully functional. I have made a slight change in the way the HomePage is displayed, but this has been only done upon personal preferences (containers About This App and Get Started in src/app/page.tsx moved next to each other)
2. I have used TailwindCSS classes to add breaking points and improve user experience according to screen-size (mobile-first approach) in HomePage, Navigation and in single note view src/app/notes/id/page.tsx (Edit & Delete buttons spaced by adding mb and ml, line 123).
3. I have added a head with a meta and link tag which includes a favicon (layout.tsx, line 22)
4. Used Lighthouse tool to check accessibility in several pages:
   - Homepage: 'Background and foreground colors do not have a sufficient contrast ratio' in the Create New Note button - darker shade of green used for higher contrast in Homepage and All Notes page.
   - NoteItem.tsx: 'Heading elements are not in a sequentially-descending order' - changed h3 to h2 for note.title in line 52.
5. Whilst rechecking the app I spotted a small bug in Dark Mode. When Creating or updating a Note, the input fields title&content react to the mode toggle making the font invisible.
