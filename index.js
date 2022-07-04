/* eslint-disable no-unused-vars, no-undef, no-return-assign */
import { addBook, removeBook } from './modules/localStorage.js';
import BookCollection from './modules/bookClass.js';
import { insertDate } from './modules/date.js';
import { handleLinkClick, clearFormFields } from './modules/navigation.js';

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

insertDate();

// Display books on page load
window.addEventListener('DOMContentLoaded', BookCollection.bookDisplay);

// Add Book Event
const formEl = document.querySelector('#book-form');
formEl.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('#book-name').value;
  const author = document.querySelector('#book-author').value;

  if (title !== '' && author !== '') {
    if (e.target.classList.contains('addButton')) {
      const newBook = new Book(title, author);
      newBook.id = BookCollection.bookList.length + 1;
      BookCollection.addBookUI(newBook);
      addBook(newBook); // Add book to booklist in localStorage
      clearFormFields();
      formEl.submit();
    }
  }
});

// Remove Book from UI, localStorage and Book List
const bookContainer = document.querySelector('.booksContainer');
bookContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const bookId = e.target.parentElement.id;
    BookCollection.removeBook(bookId);
    removeBook(bookId);
    e.target.parentElement.remove();
  }
});

// Nav-links event
document.getElementById('nav-links').addEventListener('click', handleLinkClick);
document.getElementById('defaultOpen').click(); // Click on the list nav-link at default on page load
