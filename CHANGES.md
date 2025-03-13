# Task approach:

Dev branch created 1-JavierMR-interview-task as a way to isolate changes and allow safe integration into the main project.

1. Opened localhost which displayed the homepage of the app however error was thrown when clicking on View All Notes - from the terminal the error seems to point to services/noteService.ts (line 117) and it's a syntax error.

2. View All Notes functional, checked single notes and they show all their details.
3. Search functionality checked and it seems to be working with no issues.

## Issues

1. Syntax error when trying to access View All Notes from Homepage.

## Fixes

1. noteService.ts was missing a closing curly brace, hence the Unexpected eof (end of file) message from terminal. Curly brace added in line 121.
