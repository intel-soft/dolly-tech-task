# Changes Summary

- Fixed syntax error in `noteService` (extra comma and missing closing brace `}`).
- Resolved issue with links not working (likely fixed by syntax error resolution).
- Bug fix in `storageService` where `createdAt` was incorrectly updated on note update (Bug #2).
- Tested `create()` and `update()` functions using Jest.
- Fixed "Create New Note" functionality by ensuring proper submission logic in `NoteForm.tsx`.
- Corrected `POST` to `PUT` request in `noteService` for note updates.
- Implemented dark mode toggle with a simple class-based solution.

---

# Detailed Explanation

## 1. Initial Error: Syntax Issue in `noteService`

The first error was identified by the IDE in `noteService`, where a syntax error occurred due to an extra comma and a missing closing brace (`}`). Once resolved, I noticed that the links on the homepage were no longer malfunctioning, which likely indicates the syntax issue was the cause of the link problem as well.

## 2. Exploring the Structure: Homepage and `initSampleData()`

To understand the program structure, I started at the homepage (`@/app/page.tsx`), where I came across the `initSampleData()` function. This function led me to explore `@/actions/noteActions` and ultimately to `@/utils/storage`. Here, I identified my first bug, labelled **Bug #2**. 

## 3. Bug #2 Fix: Incorrect `createdAt` Update

The issue was that the `createdAt` value was being incorrectly updated to the current time every time a note was updated, which was flawed logic. The solution was simple—removing this update during the note update process fixed the bug.

## 4. Testing the `update()` Function

After implementing the fix, I wrote a new test file in `@/tests` to validate the `update()` function. However, since testing `update()` requires a note to exist, I first verified that the `create()` function worked as expected and returned correct values. After confirming the `create()` function's output, I proceeded to test the `update()` function.

## 5. Manual Testing: Issue with "Create New Note"

When manually testing the webpage, I encountered an issue with creating new notes. Although I was able to submit the 'Create New Note' form, the logic before submission seemed to fail. By adding print statements in `NoteForm.tsx`, I confirmed that the title and content were being correctly passed down to the component. Upon further investigation, I realised that the submit button was not triggering any logic other than re-routing to the homepage. To fix this, I ensured the `onSubmit` prop was called correctly within the component. This prop takes either a `CreateNoteDto` or `UpdateNoteDto`, and in this case, it was a `CreateNoteDto`. I also added `await` to the `create()` function, as it is asynchronous.

## 6. Incorrect HTTP Request Type in `noteService`

When testing the update feature, I noticed that a `POST` request was being sent instead of the expected `PUT` request. This issue was found in the `updateNote()` function within `noteService`. I corrected the request type to `PUT` to align with the expected behaviour.

## 7. Implementing Dark Mode

For the dark mode implementation, I explored a few methods, including defining colour palettes in `globals.css`. However, to keep things simple and complete the task, I opted for adding a `dark` class to the main components of the page and using a toggle button to activate and deactivate it.
