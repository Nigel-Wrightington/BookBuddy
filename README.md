# Book Buddy

![The landing page of Book Buddy displays a catalog of different books.](/example.png)

Welcome to Book Buddy! Your task is to build out a functional client for [the Book Buddy API](https://fsa-book-buddy-b6e748d1380d.herokuapp.com/docs/). This API holds a catalog of books, which users can reserve or return, once they are logged in.

A [live demo of the finished project](https://fsa-book-buddy.netlify.app/) is available for reference.

## Requirements

### All users should be able to:

- See all books in the library's catalog
- View details of an individual book
- Register for a new account
- Log in to an existing account

### Logged in users should be able to:

- Check out an available book
- View their profile page, which includes information such as their name and their email
- See a list of books that they have reserved
- Return a book they have checked out

> [!WARNING]
>
> The API is _not_ instanced by cohort! Everyone interacts with the same set
> of books. Please let your instructor know if all of the books are reserved and you
> cannot make any reservations. Be mindful of this as you work on the project, and
> try not to reserve too many books at once while you are testing!

## Recommended Site Layout

While you are free to organize your project however you'd like to meet the requirements, here is a recommended site layout to follow:

`/`, `/books` - list of all books in catalog

- each book links to its individual page

`/books/:id` - details about the specific book

- if the user is logged in, show a "Reserve" button for the user to check out this book
- if the book is already reserved, the button should be disabled

`/account` - profile page

- if the user is not logged in, show them a link to register or log in
- if the user is logged in, then show their account details such as name and email
- show a list of all reservations the user has made
  - in this list, also include a button for users to return the reserved book

## Submission

**Make a pull request** from your fork into the main branch of this starter repo. The title of your pull request should include your full name. Submit the link to your _pull request_.
