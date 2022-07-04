import { DateTime } from '../library/luxon.js';
import BookCollection from '../modules/book.js';
import getBooks from '../modules/getbook.js';

// Insert date
const now = DateTime.now();

const insertDate = () => {
  const navbar = document.querySelector('header');

  const dateEl = document.createElement('div');
  dateEl.classList.add('date');

  dateEl.innerHTML = `${now.toLocaleString(DateTime.DATETIME_MED)}`;
  navbar.appendChild(dateEl);
};

// localstorage.js

const addBook = (book) => {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('bookList', JSON.stringify(books));
};

const removeBook = (id) => {
  const books = getBooks();
  books.forEach((book, index) => {
    if (book.id.toString() === id) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem('bookList', JSON.stringify(books));
};

// navigation.js
const handleLinkClick = (e) => {
  let i;
  const tabcontent = document.getElementsByClassName('tab-content');
  for (i = 0; i < tabcontent.length; i += 1) {
    tabcontent[i].style.display = 'none';
  }

  const tabLinks = document.getElementsByClassName('links');
  for (i = 0; i < tabLinks.length; i += 1) {
    tabLinks[i].style.color = '';
  }

  if (e.target.classList.contains('book-list-link')) {
    document.querySelector('#allBooks').style.display = 'block';
    e.target.style.color = 'blue';
  }
  if (e.target.classList.contains('add-new-book')) {
    document.querySelector('#add-book-form').style.display = 'block';
    e.target.style.color = 'blue';
  }
  if (e.target.classList.contains('contact-sec')) {
    document.querySelector('#contact').style.display = 'block';
    e.target.style.color = 'blue';
  }
};

const clearFormFields = () => {
  document.querySelector('#book-name').value = '';
  document.querySelector('#book-author').value = '';
};

// index.js
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
      const newBook = new BookCollection(title, author);
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
