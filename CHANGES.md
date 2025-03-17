The first error was picked up by the IDE in noteService, it was a syntax error including an extra comma and a missing closing brace '}'.
When initially opening the webpage, the Links were not working, I suspect fixing this syntax issue resolved this.

To understand the structure of the program, I started at the homepage '@/app/page.tsx', where I found 'initSampleData()'
I explored this function from '@/actions/noteActions' which led me to storageService '@/utils/storage'
Here, I understood each function used for back-end purposed, and spotted the first bug (labelled Bug #2), fix below:

- The fix was simple, createdAt value was being updated to the current time whenever the note was being updated, which is flawed logic and simply needed removing
I then conducted testing for this fix:

To test the new update() function, I used Jest and wrote a new test file in '@/tests'. However, to test the update() function I would need to create a new note first, so I made sure the create() function works as expected and delivers output with correct values. I then conducted a test on the update function.

---

