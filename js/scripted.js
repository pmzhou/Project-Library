// --- Book Library Core Logic ---
const myLibrary = [];

function Book(title, author, pages = 0, read = false) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

// --- DOM Elements ---
const newBookBtn = document.getElementById('newBookBtn');
const dialog = document.getElementById('bookDialog');
const closeDialog = document.getElementById('closeDialog');
const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('book-list');

// --- Event Listeners ---
// Open the dialog
newBookBtn.addEventListener('click', () => dialog.showModal());

// Close the dialog
closeDialog.addEventListener('click', () => dialog.close());

// Handle form submission
bookForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent page reload / server submission

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  bookForm.reset();
  dialog.close();
});

// --- Display Books ---
function displayBooks() {
  // Clear previous list
  bookList.innerHTML = '';

  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? '✅ Read' : '❌ Not Read'}</p>
      <button class="toggle-btn">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
      <button class="remove-btn">Remove</button>
    `;

    // Toggle button
    card.querySelector('.toggle-btn').addEventListener('click', () => {
      book.toggleRead();
      displayBooks(); // re-render
    });

    // Remove button
    card.querySelector('.remove-btn').addEventListener('click', () => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      myLibrary.splice(index, 1);
      displayBooks();
    });

    bookList.appendChild(card);
  });
}
