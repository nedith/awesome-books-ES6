import { DateTime } from "./library/luxon.js";
const getBooks = () => {
  let books;
  if (localStorage.getItem('bookList') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('bookList'));
  }
  return books;
};

class BookCollection {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static bookList = getBooks();

  static bookCard({ title, author, id }) {
    const cardHolder = document.createElement('div');
    cardHolder.classList.add('book-card');
    cardHolder.id = id;

    const displayEl = document.createElement('div');
    displayEl.textContent = `"${title}" by ${author}`;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'remove';
    removeBtn.classList.add('remove-btn');

    cardHolder.append(displayEl, removeBtn);
    return cardHolder;
  }

  static addBookUI(book) {
    const bookContainer = document.querySelector('.booksContainer');
    bookContainer.appendChild(BookCollection.bookCard(book));
    BookCollection.bookList = [...BookCollection.bookList, book];
  }

  // Display books in Booklist on page load
  static bookDisplay() {
    const bookContainer = document.querySelector('.booksContainer');
    BookCollection.bookList.forEach((book) => {
      bookContainer.appendChild(BookCollection.bookCard(book));
    });
  }

  // Remove book
  static removeBook(id) {
    BookCollection.bookList = BookCollection.bookList.filter(
      (item) => item.id.toString() !== id,
    );
  }
}

// // from date.js
const now = DateTime.now();

// const getDate = () => {
//   let { month } = now;
//   let { day } = now;
//   const { year } = now;

//   if (day < 10) {
//     day = `0${day}`;
//   }
//   if (month < 10) {
//     month = `0${month}`;
//   }
//   return `${day} - ${month} - ${year},`;
// };

// const getTime = () => {
//   let { hour } = now;
//   let minutes = now.minute;
//   let seconds = now.second;
//   if (hour < 10) {
//     hour = `0${hour}`;
//   }
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }
//   if (seconds < 10) {
//     seconds = `0${seconds}`;
//   }
//   return `${hour}:${minutes}:${seconds}`;
// };

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
